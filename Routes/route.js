const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const wishlistController = require('../Controllers/wishlistController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const cartController = require('../Controllers/cartController')

const router = new express.Router()

//get all products
router.get('/all-products',productController.getAllProducts)

//register
router.post('/user/register',userController.register)

//login
router.post('/user/login',userController.login)

//get a product
router.get('/view-product/:id',productController.getProduct)

//add to wishlist
router.post('/wishlist',jwtMiddleware,wishlistController.addwishlist)

//get a wishlist item
router.get('/get-wishlist',jwtMiddleware,wishlistController.getWishlist)

//delete from wishlists
router.delete('/delete-wishlist/:id',jwtMiddleware,wishlistController.deleteFromWishlist)

//add to cart
router.post('/add-cart',jwtMiddleware,cartController.addToCart)

//get cart items
router.get('/get-cart',jwtMiddleware,cartController.getCart)

//delete from cart
router.delete('/delete-cart/:id',jwtMiddleware,cartController.deleteCart)

//increment cart product
router.get('/increment-cart/:id',jwtMiddleware,cartController.incrementCart)

//increment cart product
router.get('/decrement-cart/:id',jwtMiddleware,cartController.decrementCart)


module.exports = router