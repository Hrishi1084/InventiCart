import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductDetailsHome = ({ product }) => {
  const { user } = useAuthContext();
  const [quantityToBuy, setQuantityToBuy] = useState(1);

  const handleBuy = async () => {
    if (!user) {
      alert("You need to be logged in to buy products.");
      return;
    }

    if (quantityToBuy > product.quantity) {
      alert("Selected quantity exceeds available stock.");
      return;
    }

    const updatedQuantity = product.quantity - quantityToBuy;

    const response = await fetch(`https://inventicart.onrender.com/api/products/${product._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({ quantity: updatedQuantity }),
    });

    const json = await response.json();
    if (response.ok) {
      alert(`You have successfully purchased ${quantityToBuy} item(s) of ${product.title}`);
      product.quantity = updatedQuantity; // Reflect updated quantity in the UI
    } else {
      alert(json.error);
    }
  };

  return (
    <div className="product-details">
      <h3>{product.title}</h3>
      <p><strong>Price: </strong>${product.price}</p>
      <p><strong>Quantity Available: </strong>{product.quantity}</p>

      <label>Quantity: </label>
      <input
        type="number"
        value={quantityToBuy}
        min="1"
        max={product.quantity}
        onChange={(e) => setQuantityToBuy(Math.min(e.target.value, product.quantity))}
      />

      <button onClick={handleBuy} disabled={product.quantity <= 0}>
        {product.quantity > 0 ? "Buy" : "Out of Stock"}
      </button>

      {/* Display the merchant's email */}
      <p style={{ marginTop: '10px', color: 'gray', fontSize: '0.9em' }}>
        <strong>Sold by: </strong>{product.user_id?.email}
      </p>
    </div>
  );
};

export default ProductDetailsHome;
