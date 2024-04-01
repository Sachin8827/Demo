import sequelize from "../DatabaseInfo/GetConnection.js";
import { DataTypes } from "sequelize";

const Address = sequelize.define("Address", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    houseNo : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    street :{
        type : DataTypes.STRING,
        allowNull : false,
    },
    City : {
        type : DataTypes.STRING,
        allowNull : false
    },
    State :{
        type : DataTypes.STRING,
        allowNull : false
    }
},{timestamps : false});

sequelize.sync();
export default Address;
