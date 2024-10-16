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

router.get('inventi-cart.vercel.app/', getProducts)

router.get('inventi-cart.vercel.app/:id', getProduct)

router.post('inventi-cart.vercel.app/', createProduct)

router.delete('inventi-cart.vercel.app/:id', deleteProduct)

router.patch('inventi-cart.vercel.app/:id', updateProduct)

router.patch('inventi-cart.vercel.app/:id', requireAuth, updateProductQuantity)

module.exports = router;
