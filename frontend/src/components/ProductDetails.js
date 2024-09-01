import { useProductsContext } from '../hooks/useProductsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const ProductDetails = ({ product }) => {
    const { dispatch } = useProductsContext()
    const { user } = useAuthContext()
    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/products/' + product._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_PRODUCT', payload: json })
        }
    }
    return (
        <div className="product-details">
            <h4>{product.title}</h4>
            <p><strong>Quantity: </strong>{product.load}</p>
            <p><strong>Price: </strong>{product.reps}</p>
            <p>{formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default ProductDetails