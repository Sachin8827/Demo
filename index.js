import express from 'express';
import bodyParser  from 'body-parser';
import UserRouter from './routes/user.routes.js'
import ProductRouter from './routes/product.route.js';
import CategoryRouter from './routes/category.route.js';
import './model/association.js'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/user', UserRouter);
app.use('/product', ProductRouter);
app.use('/category', CategoryRouter);

app.listen(3000, () =>{
    console.log("Server started");
});