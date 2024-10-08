import mongoose, { Schema, StringSchemaDefinition, model } from 'mongoose';
import { OrderModel } from './order.model';

const bcrypt = require('bcryptjs');

export interface User{
    id:string;
    email:string;
    name:string;
    password:string;
    isAdmin:boolean;
    token:string;
    resetToken: string;
    tokens:any;
}

export const UserSchema = new Schema<User>({
    name: {
        type: String, 
        required: [true, "Please add a name"],
        maxlength: [50, "Name can not be more than 50 characters"]
    },
    password: {
        type: String, 
        required:true,
        minlength: [6, "Password can not be less than 6 characters"] 
    },
    email: {
        type: String, 
        required:true, 
        unique: true
    },
    isAdmin: {
        type: Boolean, 
        required:true 
    },
    token: { 
        type: String, 
        require: false
    },
    resetToken: { 
        type: String, 
        require: false
    },
    tokens: { 
        id:{type:String , required: false},
        token:{type: String, required: false}
    }
},{
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const UserModel = model<User>('user', UserSchema);