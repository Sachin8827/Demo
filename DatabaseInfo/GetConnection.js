import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'Ecommerce',
    'root',
    'root',
    {
        dialect :'mysql',
        host : 'localhost',
    }
);
export default sequelize;
