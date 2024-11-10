import { useEffect } from "react";
import ProductDetailsDashboard from "../components/ProductDetailsDashboard";
import ProductForm from "../components/ProductForm";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ChatbotButton from "../components/ChatbotButton"; // Import the chatbot

const Dashboard = () => {
    const { products, dispatch } = useProductsContext();
    const { user } = useAuthContext();
    
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json });
            }
        };
        if (user) {
            fetchProducts();
        }
    }, [dispatch, user]);

    return (
        <div className="dashboard">
            <div className="product">
                {products && products.map((product) => (
                    <ProductDetailsDashboard key={product._id} product={product} />
                ))}
            </div>
            <ProductForm />
            
            {/* Add the chatbot button at the bottom-right */}
            <ChatbotButton />
        </div>
    );
};

export default Dashboard;
