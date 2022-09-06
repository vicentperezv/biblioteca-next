import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
    name: string;
    email: string;
    password: string;
}

interface IUserDocument extends IUser, Document {
    generateHashPassword: (password: string) => string;
    validPassword: (password: string) =>boolean;
}

const userSchema : Schema<IUserDocument> = new Schema({
    name : { 
        type: String,
        required: true,
        trim: true
    },
    email : { 
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password :{ 
        type: String,
        required: true,
        trim: true
    }   
});


userSchema.methods.generateHashPassword = function(password : string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function(password : string) {
    return bcrypt.compareSync(password, this.password);
}
export default model('User',userSchema);