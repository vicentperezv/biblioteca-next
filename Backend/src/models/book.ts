import {Schema, model} from 'mongoose';

const bookSchema = new Schema({
    title :{
        type: 'String',
        required: true,
        trim: true
    },
    author: {
        type: 'String',
        required: true,
        trim: true
    },
    category: {
        type: 'String',
        required: true,
        trim: true
    },
    publisher:{
        type: 'String',
        required: true,
        trim: true
    },
    isbn:{
        type: 'String',
        required: true,
        trim: true
    },
    cover: {
        type: 'String',        
    },
    borrowed: {
        type: 'Boolean',
        required: true,
    },
    borrowedTo: {
        type: 'String',        
        trim: true
    }
})

export default model('Book', bookSchema)