import sequelize from "../DatabaseInfo/GetConnection.js";

const UserAddress = sequelize.define('userAddress',{}, {timestamps: false});

export default UserAddress;