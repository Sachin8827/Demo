
import User from '../model/user.model.js'
import Cart from '../model/Cart.model.js'
import CartItem from '../model/CartItem.model.js'
import Product from '../model/Product.model.js'
import jwt from 'jsonwebtoken';
import sequelize from '../DatabaseInfo/GetConnection.js';


export const signUp = (request, response, next) =>{
    let {name, email, password} = request.body
    console.log(request.body);
    
    User.create({name, email, password}).then((result) =>{
        return response.status(200).json({result : 'Success'});
    }).catch((err) =>{
        
        return response.status(500).json({error : err, });
    });
}

export const login = async (request, response, next) =>{
    try {
        let user = await User.findOne({where : {email : request.body.email}});

        if(user){
            let password = request.body.password;
            if(User.checkPassword(password, user.password)){
                let payload = {subject : user.email}
                let token = jwt.sign(payload, "sachinBethade");
                return response.status(200).json({result : user, tokenKey : token})
            }
            return response.status(401).json({result : "Password Incorrect"});
        }
        return response.status(401).json({result : "User not found"});
    } catch (error) {
        console.log(error)
        return response.status(500).json({error : 'Internal server error'})
    }
    
}
export const addToCart = async (request, response, next) =>{
    let {uId, pId, quantity} = request.body;
    let transaction = sequelize.transaction();
    try {

        let result  = await Cart.findOne({where : {'userUserId' : uId}});
        if(!result){
            await Cart.create({"userUserId" : uId}).then(result => {CartItem.create({quantity, 'productProductId' : pId, "CartCartId" : result.dataValues.cartId},{transaction})});
            
            return response.status(200).json({result : 'Product Added in cart'});
        }
        else{
            await CartItem.create({quantity, 'productProductId' : pId, "CartCartId" : result.cartId},{transaction})
            return response.status(200).json({result : 'Product Added in cart'});
        }
    } catch (error) {
        await transaction.rollback();
    }
    

}

export const getCart = (request, response, next) =>{
    let userId = request.params.id;
    Cart.findAll({raw : true, where : {'userUserId' : userId},include : [{model : Product}, {model : User}]})
    .then(result => response.status(200).json(result))
    .catch(err => {
        console.log(err)
        response.status(200).json({error : "internal server error"})
    });
    
}

export const removeCart = async (request, response, next) =>{
    let {userId, productId} = request.body;
    let cart = await Cart.findOne({where : {userUserId : userId}});
    if(cart){
        CartItem.destroy({where : {CartCartId : cart.cartId, productProductId : productId}})
        .then(result => response.status(200).json({result : 'cart removed succesfully'}))
        .catch(err => response.status(500).json({result : 'internal server error'}))
    }
    else{
        response.status(200).json({result : 'no cart found'});
    }
}

