import { useState } from "react"
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ProductForm = () => {
    const { dispatch } = useProductsContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }
        const product = { title, quantity, price }
        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setQuantity('')
            setPrice('')
            setError(null)
            setEmptyFields([])
            console.log('New Product Added', json)
            dispatch({ type: 'CREATE_PRODUCT', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New Product</h3>
            <label>Product Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Quantity: </label>
            <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>Price(per piece): </label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button>Add Product</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ProductForm