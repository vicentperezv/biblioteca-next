import { RequestHandler } from 'express';
import Book from '../models/book';
import fs from 'fs';
import path from 'path';

export const saveBook : RequestHandler = (req, res) =>{
    
    const book = new Book();
    
    const body = req.body;
    book.title = body.title;
    book.author = body.author;
    book.category = body.category;
    book.publisher = body.publisher;
    book.isbn = body.isbn;       
    book.cover = "";
    book.borrowed = false;
    book.borrowedTo ="";

    book.save((err: any, bookStored : any) =>{
         if(err) return res.status(500).send({messege: err});
         if(!bookStored) return res.status(404).send({messege: 'Book not stored'});
         return res.status(200).send({
            book: bookStored,
            message: "Book saved"
        })
     })
    
   

     
};

export const getBookById : RequestHandler = async (req, res) =>{
    const bookId =req.params.id;
    if(bookId == null) return res.status(404).send({messege: 'Book not found'});
    Book.findById(bookId, (err : Error, book : any) =>{
        if(err) return res.status(500).send({messege: 'Error'});
        if(!book) return res.status(404).send({messege : 'Book not found'});   
        return res.status(200).send({
            book
        });
    })     
   
};

export const getBookByName : RequestHandler = (req, res)=>{
    var bookName = req.params.name;
    if(bookName == null) return res.status(404).send({messege: 'Book not found'});
    Book.find({'title': {'$regex': bookName, '$options' : 'i'}}).exec((err : any, books: any) =>{
        if(err) return res.status(500).send({messege: 'Error'});
        if(!books) return res.status(404).send({messege: 'Books not found'})
        return res.status(200).send({books});
    })

};
export const getBooks : RequestHandler = (req, res) =>{
    Book.find({}).exec((err: any, books : any) =>{
        if(err) return res.status(500).send({messege: 'Error'});
        if(!books) return res.status(404).send({messege: 'Books not found'})
        return res.status(200).send({books});
    })
};

export const availableBooks : RequestHandler = (req, res) =>{
    Book.find({borrowed : false}).exec((err, books) =>{
        if(err) return res.status(500).send({messege: 'Error'});
        if(!books) return res.status(404).send({messege: 'Books not found'})
        return res.status(200).send({books});
    })
};

export const uploadCover : RequestHandler = (req, res)=>{        
     
    const bookId = req.params.id;
    
    if(req.files){
        
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const filesObj = Object.assign(files[0])
        const filePath = filesObj.path;        
        const fileName = filesObj.filename;
        const fileExt = fileName.split('.')[1];

        if(fileExt == 'png' || fileExt == 'jpeg' || fileExt == 'jpg'){
            Book.findByIdAndUpdate(bookId, {cover : fileName},{new: true},(err, bookUpdated) => {
                if(err) return res.status(500).send({messege: 'Error'});
                if(!bookUpdated) return res.status(404).send({messege: 'Book not found'});
                return res.status(200).send({
                    book: bookUpdated
                })
            })
        }else{
            fs.unlink(filePath, (err) =>{
                return res.status(200).send({messege: 'Extension not valid'})
            })
        }
    
    }else{
        return res.status(200).send({messege: 'image not valid'})
    }

};


export const myBooks: RequestHandler = (req, res) =>{
    if(req.params.userEmail == null) return res.status(404).send({ loggedIn: false});
    const userEmail = req.params.userEmail;
    Book.find({"borrowed" : true , "borrowedTo": userEmail}).exec((err, books) =>{
        if(err) return res.status(500).send({messege: 'Error'});
        if(!books) return res.status(404).send({messege: 'Books not found'})
        return res.status(200).send({
            books
        });
    })
};

export const takeABook: RequestHandler = (req, res) =>{
    if(req.params.userEmail == null) return res.status(404).send({ loggedIn: false});
    const userEmail = req.params.userEmail;
    Book.findOneAndUpdate({"_id": req.params.id, "borrowed": false}, {"$set": {"borrowed": true, "borrowedTo": userEmail}},{new : true},(err, bookUpdated)=>{
        if(err) return res.status(500).send({messege: 'Error'});
        if(!bookUpdated) return res.status(404).send({messege: 'Book not found'});
        return res.status(200).send({
            book: bookUpdated
        })
    })

};

export const takeBack: RequestHandler = (req, res) =>{
    if(req.params.userEmail == null) return res.status(404).send({ loggedIn: false});
    const userEmail = req.params.userEmail;
    Book.findOneAndUpdate({"_id": req.params.id, "borrowed": true,"borrowedTo" : userEmail}, {"$set": {"borrowed": false, "borrowedTo": ""}},{new : true},(err, bookUpdated)=>{
        if(err) return res.status(500).send({messege: 'Error'});
        if(!bookUpdated) return res.status(404).send({messege: 'Book not found'});
        return res.status(200).send({
            book: bookUpdated
        })
    })

};

export const getCover: RequestHandler = (req, res) =>{
    const file = req.params.image;
    
    const path_file = './assets/cover/'+file;
    fs.stat(path_file, (error)=>{
        if(!error){
            return res.sendFile(path.resolve(path_file));              
        }else{
            
            return res.status(200).send({
                messege : 'cover does not exists'
            })

        }
    })
};