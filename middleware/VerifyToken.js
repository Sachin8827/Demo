
import jwt from 'jsonwebtoken';

export const  verify = (request, response, next) =>{
    try {
        let token  = request.headers.authorization.split(" ")[1];
        jwt.verify(token,'sachinBethade',);
        next();
    } catch (error) {
        return response.status(401).json({result : 'Not a valid user'});
    }
    
}