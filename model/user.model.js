import sequelize from "../DatabaseInfo/GetConnection.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcryptjs';

const User  = sequelize.define('user', {
    userId : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,

    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },

    email : {
        type: DataTypes.STRING,     
        allowNull:false,
        unique : true
    },
    contact : {
        type : DataTypes.STRING(10),
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
        set(value){
            let saltKey = bcrypt.genSaltSync(12);
            let encryptPassoword  = bcrypt.hashSync(value, saltKey);
            this.setDataValue('password', encryptPassoword);
        }
    }
},{timestamps : false});

User.sequelize.sync().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log(err);
});

User.checkPassword = (ogPassword, encryptPassoword) =>{
    return bcrypt.compareSync(ogPassword, encryptPassoword);
}

export default User;