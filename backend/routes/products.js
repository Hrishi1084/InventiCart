const express = require('express')
const Product = require('../models/productModel')
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    updateProductQuantity
} = require('../controllers/productController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('https://inventicart.onrender.com/', getProducts)

router.get('https://inventicart.onrender.com/:id', getProduct)

router.post('https://inventicart.onrender.com/', createProduct)

router.delete('https://inventicart.onrender.com/:id', deleteProduct)

router.patch('https://inventicart.onrender.com/:id', updateProduct)

router.patch('https://inventicart.onrender.com/:id', requireAuth, updateProductQuantity)

module.exports = router;
