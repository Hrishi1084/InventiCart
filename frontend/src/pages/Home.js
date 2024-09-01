import { useEffect } from "react"
import ProductDetails from "../components/ProductDetails"
import ProductForm from "../components/ProductForm"
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
    const { products, dispatch } = useProductsContext()
    const { user } = useAuthContext()
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products', {
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
                    <ProductDetails key={product._id} product={product} />
                ))}
            </div>
            <ProductForm />
        </div>
    )
}

export default Home