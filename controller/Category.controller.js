import Category from "../model/Category.model.js";
import Product from "../model/Product.model.js";


export const addCategory = async (request, response, next) => {
    try {
        let categories = request.body;
        console.log(categories)
        for(let category of categories){
            await Category.create({categoryName :  category });
        
        }
        return response.status(200).json({result : 'added succesfully'})
    } catch (error) {
        console.log(error)
        return response.status(500).json({result : 'internal server error'})
    }
    

};

// Function to fetch all categories
export const getAllCategories = (request, response, next) => {
    Category.findAll({include : Product})
        .then(categories => {
            return response.status(200).json({ categories });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        });
};

// Function to fetch a category by name
export const getCategoryByName = (request, response, next) => {
    let { name } = request.params;
    Category.findOne({ where: { name } })
        .then(category => {
            if (!category) {
                return response.status(404).json({ error: 'Category not found' });
            }
            return response.status(200).json({ category });
        })
        .catch(error => {
            console.error('Error fetching category by name:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        });
};

// Function to delete a category by id
export const deleteCategoryById = (request, response, next) => {
    let categoryId = request.params.id;
    Category.destroy({ where: { id: categoryId } })
        .then(deletedCount => {
            if (deletedCount === 0) {
                return response.status(404).json({ error: 'Category not found' });
            }
            return response.status(200).json({ message: 'Category deleted successfully' });
        })
        .catch(error => {
            console.error('Error deleting category:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        });
};

// Function to update a category by id
export const updateCategoryById = (request, response, next) => {
    let categoryId = request.params.id;
    let { name } = request.body;
    Category.findByPk(categoryId)
        .then(categoryToUpdate => {
            if (!categoryToUpdate) {
                return response.status(404).json({ error: 'Category not found' });
            }
            categoryToUpdate.name = name;
            return categoryToUpdate.save();
        })
        .then(updatedCategory => {
            return response.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
        })
        .catch(error => {
            console.error('Error updating category:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        });
};