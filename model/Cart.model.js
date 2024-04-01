import sequelize from "../DatabaseInfo/GetConnection.js";
import { DataTypes } from "sequelize";

const Cart = sequelize.define('Cart', {
    cartId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    }
    
},{timestamps : false});
export default Cart;