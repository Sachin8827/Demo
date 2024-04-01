import express from 'express';

import {insertProductInBulk, getAllProduct} from '../controller/product.controller.js'

const router = express.Router();

router.post('/insert', insertProductInBulk);
router.get('/getproduct', getAllProduct);

export default router