import { useEffect } from "react"
import ProductDetailsDashboard from "../components/ProductDetailsDashboard"
import ProductForm from "../components/ProductForm"
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Dashboard = () => {
    const { products, dispatch } = useProductsContext()
    const { user } = useAuthContext()
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('inventi-cart.vercel.app/api/products', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json })
            }
        }
        if (user) {
            fetchProducts()
        }
    }, [dispatch, user])
    return (
        <div className="home">
            <div className="products">
                {products && products.map((product) => (
                    <ProductDetailsDashboard key={product._id} product={product} />
                ))}
            </div>
            <ProductForm />
        </div>
    )
}

export default Dashboard
