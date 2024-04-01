import Category from "./Category.model.js";
import Product from "./Product.model.js";
import User from './user.model.js';
import Cart from './Cart.model.js';
import CartItem from './CartItem.model.js';
import Address from "./Address.model.js";
import UserAddress from "./UserAddress.model.js";

Category.hasMany(Product,{foreignKey : 'categoryname'});
Product.belongsTo(Category, {foreignKey : 'categoryname', targetKey : 'categoryName'});

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {through : CartItem});
Product.belongsToMany(Cart, {through : CartItem});

User.belongsToMany(Address, {through : UserAddress});
Address.belongsToMany(User, {through : UserAddress});


export {Category, Product, CartItem, Cart, Address};