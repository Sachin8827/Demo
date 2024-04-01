import Product from '../model/Product.model.js';


export const insertProductInBulk = async (request, response, next) =>{
    try {
        let productList  = request.body;
        for(let product of productList){
                let {title, price, description, stock, brand, thumbnail, category} = product;
                console.log(category);
                await Product.create({title, price, description, stock, brand, thumbnail 
                    ,categoryname : category});
        }
        return response.status(200).json({result : 'added succesfully'})
    } catch (error) {
        return response.status(500).json({result : 'internal server error'})
    }
}

export const getAllProduct = (request, response, next) =>{
    Product.findAll().then(result => response.status(200).json(result))
    .catch(err => response.status(500).json({err : err}));
}
