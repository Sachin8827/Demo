import sequelize from "../DatabaseInfo/GetConnection.js";
import { DataTypes } from "sequelize";

const CartItem = sequelize.define('CartItems',{
    quantity : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey: false
    }
},{timestamps : false});

sequelize.sync();

export default CartItem;