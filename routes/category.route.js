import express from 'express';
import {addCategory, getAllCategories, getCategoryByName, deleteCategoryById, updateCategoryById} from '../controller/Category.controller.js'
import { verify } from '../middleware/VerifyToken.js';
const router = express.Router();


router.post('/add', addCategory);

router.get('/getcategories',verify, getAllCategories);

router.get('/search/:name', getCategoryByName);

router.delete('/delete/:id', deleteCategoryById);

router.put('/update/:id', updateCategoryById);


export default router;
