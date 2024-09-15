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

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', createProduct)

router.delete('/:id', deleteProduct)

router.patch('/:id', updateProduct)

router.patch('/:id', requireAuth, updateProductQuantity)

module.exports = router;