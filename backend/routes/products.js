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

router.get('https://inventi-cart.vercel.app//', getProducts)

router.get('https://inventi-cart.vercel.app//:id', getProduct)

router.post('https://inventi-cart.vercel.app//', createProduct)

router.delete('https://inventi-cart.vercel.app//:id', deleteProduct)

router.patch('https://inventi-cart.vercel.app//:id', updateProduct)

router.patch('https://inventi-cart.vercel.app//:id', requireAuth, updateProductQuantity)

module.exports = router;
