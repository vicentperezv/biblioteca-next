import { RequestHandler } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const secret ='not look';
interface TokenInterface {
    _id: string,
    email: string

}

export const create: RequestHandler = (req, res) => {       
                  
    const user = new User();
    const body = req.body;
    user.name = body.name;
    user.password = body.password;
    user.email = body.email;
    user.password = user.generateHashPassword(user.password);
    
    
    user.save((err : any, userCreated: any) => {
        if(err && err.code === 11000) return res.status(500).send({ message: 'email already exists' });
        if (err) return res.status(500).send({ message: 'Error'});
        if(!userCreated) return res.status(404).send({ message: 'User not Created'}); 
                         
        const token = jwt.sign({
            exp:Math.floor(Date.now()/1000) +60 *60 *24 *30 ,
            _id : user._id,
            email : user.email
            },secret);
        
        const serialized = serialize('authorization', token,{ 
            httpOnly: true,
            secure : true,
            sameSite: 'none',
            maxAge : 1000* 60 * 60 * 24 *30,
            path: '/'
        });
        res.setHeader('Set-Cookie', serialized)
        return res.json({                                   
            result: true
        });
    })                
    
    
    
    
};

export const login: RequestHandler = (req, res) => {
    
    User.findOne({email: req.body.email}, (err : any, user: any) =>{
        if(user == null) return res.status(404).send({ message: 'User or password not valid' });
        if (user != null && !user.validPassword(req.body.password)) return res.status(404).send({ message :'User or password not valid'});
        if(err) return res.status(500).send({ message :'error'});                            
                        
        const token = jwt.sign({
            exp:Math.floor(Date.now()/1000) +60 *60 *24 *30,
            _id : user._id,
            email : user.email
            }, secret );

        const serialized = serialize('authorization', token,{ 
                httpOnly: true,
                secure : true,
                sameSite: 'none',
                maxAge : 1000* 60 * 60 * 24 *30,
                path: '/'
        });

        res.setHeader('Set-Cookie', serialized)
        return res.json({                                   
                result: true
        });
    });
}

export const isLogged: RequestHandler =  (req, res) => {
    if(req.session == null) return res.status(404).send({ loggedIn: false})
    const userLogged = req.session;
    res.status(200).send({loggedIn: true, userLogged});
    
}

export const logout : RequestHandler = (req, res) => {

    const serialized = serialize('authorization', '',{ 
        httpOnly: true,
        secure : true,
        sameSite: 'none',
        maxAge : 0,
        path: '/'
    });
    res.setHeader('Set-Cookie', serialized)
        return res.json({                                   
                result: true
    });
}

export const profileHandler : RequestHandler = (req, res) => {
    const { authorization } = req.cookies;
    
    if (!authorization) {
      return res.status(401).json({ error: "Not logged in" });
    }
  
    const { email } = jwt.verify(authorization, secret) as TokenInterface;
    return res.status(200).json({ email });
  }