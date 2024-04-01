import sequelize from "../DatabaseInfo/GetConnection.js";
import { DataTypes } from "sequelize";
import Category from "./Category.model.js";

const Product = sequelize.define('product', {
    productId : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false,

    },  
    price :{
        type : DataTypes.INTEGER,
        allowNull : false,

    },
    description : {
        type : DataTypes.TEXT,
        allowNull : false,

    },
    stock : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    brand :{
        type : DataTypes.STRING,
        allowNull : false
    },
    thumbnail : {
        type : DataTypes.STRING,
        allowNull : false,
    },

}, {timestamps: false});




Product.sequelize.sync().then(result => {console.log('Table created Successfully')}).catch(err => {console.log(err)});

export default Product;
