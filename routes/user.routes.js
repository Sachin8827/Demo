import express from 'express';
import {body} from 'express-validator';
import {signUp, login, addToCart, getCart, removeCart} from '../controller/user.controller.js'
import { verify } from '../middleware/VerifyToken.js';


const router = express.Router();

router.post('/signup',
body('username','Username is required').notEmpty(),
body('password', 'Password is required').notEmpty(),
body('password','Password must have atleast 6 character').isLength({min:6}),
body('email', "Invalid Email").isEmail(),
body('email', 'Email is required').notEmpty(),
body('contact', 'Contact is required').notEmpty(),
body('contact', 'Only numeric allowed').isNumeric(), signUp);
router.post('/login', login);
router.post('/insertcart',verify, addToCart);
router.get('/viewcart/:id', verify, getCart);
router.delete('/removecart',verify, removeCart);


export default router;
