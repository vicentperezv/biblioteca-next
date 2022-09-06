import User from '../models/user';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { RequestHandler, Request } from 'express';

const secret : Secret ='not look';

export interface TokenInterface {
    _id: string,

}

export const verifyToken : RequestHandler = (req, res, next) => {

        if(!req.cookies.authorization){
            return res.status(401).send('an unauthorized request');        
        }
        
        const token = req.cookies.authorization;
        
         const payload = jwt.verify(token, secret) as TokenInterface;
         req.params.userId =payload._id
         next();
};    
   
export const name: RequestHandler = (req, res, next)=>{      

        User.findOne({_id: req.params.userId}, (err : any, user : any) => {
            if(user == null) return res.status(404).send({ message: 'User not valid' });
            
            if(err) return res.status(500).send({ message :'error'});
    
            req.params.userName = user.name;
            next();
        })
};

export const email: RequestHandler = (req, res, next) =>{        

        User.findOne({_id: req.params.userId}, (err: any, user : any) => {
            if(user == null) return res.status(404).send({ message: 'User not valid' });
            
            if(err) return res.status(500).send({ message :'error'});
    
            req.params.userEmail = user.email;
            next();
        })
};
