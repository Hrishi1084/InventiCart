import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductDetailsHome = ({ product }) => {
  const [quantityToBuy, setQuantityToBuy] = useState(1);
  const { user } = useAuthContext();

  const handleBuy = async () => {
    if (!user) {
      alert("You must be logged in to buy products.");
      return;
    }

    if (quantityToBuy > product.quantity) {
      alert("Selected quantity exceeds available stock.");
      return;
    }

    const updatedQuantity = product.quantity - quantityToBuy;

    const response = await fetch(`/api/products/${product._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ quantity: updatedQuantity })
    });

    const json = await response.json();
    if (response.ok) {
      alert("Purchase successful!");
      product.quantity = updatedQuantity;
    } else {
      alert(json.error);
    }
  };

  return (
    <div className="product-details">
      <h3>{product.title}</h3>
      <p><strong>Price: </strong>₹{product.price}</p>
      <label>Quantity to Buy:</label>
      <input 
        type="number" 
        min="1" 
        max={product.quantity} 
        value={quantityToBuy} 
        onChange={(e) => setQuantityToBuy(parseInt(e.target.value))} 
      />
      <button onClick={handleBuy} disabled={product.quantity <= 0}>
        {product.quantity > 0 ? "Buy" : "Out of Stock"}
      </button>
    </div>
  );
};

export default ProductDetailsHome;
