import { useEffect, useState } from "react";
import ProductDetailsHome from "../components/ProductDetailsHome";
import { useAuthContext } from '../hooks/useAuthContext';
import ChatbotButton from "../components/ChatbotButton"; // Import the chatbot

const Home = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://inventi-cart.vercel.app//api/products', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
      const json = await response.json();

      if (response.ok) {
        setProducts(json); // Now includes user_id with merchant email
      } else {
        console.error('Error fetching products:', json.error);
      }
    };

    if (user) {
      fetchProducts();
    }
  }, [user]);

  return (
    <div className="home">
      <h2>Available Products</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductDetailsHome key={product._id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      {/* Add the chatbot button at the bottom-right */}
      <ChatbotButton />
    </div>
  );
};

export default Home;
