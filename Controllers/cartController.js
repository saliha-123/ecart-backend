const carts = require('../Models/cartSchema')

//AddToCart
exports.addToCart = async(req,res) =>{
    //get details
    const {id,title,price,image,quantity} = req.body

    try{
        const cartItem = await carts.findOne({id})
        if(cartItem){
            cartItem.quantity+=1;
            cartItem.price=cartItem.quantity*cartItem.price;

            res.status(200).json("Product updated successfully")
        }
        else{
            const cartNewProduct = new carts({id,title,price,image,quantity})
            await cartNewProduct.save()

            res.status(200).json("Product added successfully")
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}

//get products from cart
exports.getCart = async(req,res) =>{
    try{
        const allCartProducts = await carts.find()
        res.status(200).json(allCartProducts)
    }
    catch(err){
        res.status(404).json(err)
    }
}

//delete from cart
exports.deleteCart = async(req,res) =>{
    const {id} = req.params
    try{
        const deleteItem = await carts.deleteOne({id})
        if(deleteItem){
            const allCartProducts = await carts.find()
            res.status(200).json(allCartProducts)
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}


//increment cart
exports.incrementCart = async(req,res) =>{
    const {id}=req.params
    try{
        //check if product already exists
        const incrementCartProduct = await carts.findOne({id})
        //if product already exists, then increment product quantity by 1 and update the price accordingly
        if(incrementCartProduct){
            incrementCartProduct.quantity+=1
            incrementCartProduct.grandTotal = incrementCartProduct.price*incrementCartProduct.quantity
            //if its updated, then stored to mongodb
            await incrementCartProduct.save()
            //get all the products item details after updating
            const allCartProducts = await carts.find()
            res.status(200).json(allCartProducts)
        }
        else{
            res.status(402).json("item not found")
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}


//decrement cart
exports.decrementCart = async(req,res) =>{
    const {id} = req.params
    try{
        const decrementCartProduct = await carts.findOne({id})
        if(decrementCartProduct){
            decrementCartProduct.quantity-=1
            if(decrementCartProduct.quantity===0){
                const deleteItem = await carts.deleteOne({id})
                if(deleteItem){
                    const allCartProducts = await carts.find()
                    res.status(200).json(allCartProducts)
                }
            }
            else{
                decrementCartProduct.grandTotal=decrementCartProduct.price*decrementCartProduct.quantity
                await decrementCartProduct.save()
                const allCartProducts = await carts.find()
                res.status(200).json(allCartProducts)
            }
        }
        else{
            res.status(402).json("item not found")
        }

    }
    catch(err){
        res.status(404).json(err)
    }
}