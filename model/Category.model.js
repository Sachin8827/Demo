import sequelize from "../DatabaseInfo/GetConnection.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define('Category',{
    
    categoryName : {
        type : DataTypes.STRING,
        primaryKey : true
    }
},{timestamps : false});

Category.sequelize.sync().then(result => {console.log('Table created Successfully')}).catch(err => {console.log(err)});

export default Category;
