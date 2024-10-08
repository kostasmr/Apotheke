import { Router } from 'express';
import { sample_users } from '../data';
import jwt from "jsonwebtoken"
import expressAsyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } from '../constants/http_status';
import auth from '../middlewares/auth'

const sendEmail = require("../utils/sendEmail")
const router = Router();
const bcrypt = require('bcryptjs');

router.get("/seed", expressAsyncHandler(
    async (rew,res) => {
    const usersCount = await UserModel.countDocuments();
    if(usersCount > 0){
        res.send("Seed is already done!");
        return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done");
}));

router.get("/users-page", auth,expressAsyncHandler(
    async (req,res) => {
        const users = await UserModel.find();
        res.send(users);
    }
));

router.post("/login", expressAsyncHandler(
    async (req, res) => {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            res.status(HTTP_BAD_REQUEST).send("This user does not exists!");
        }else{
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const token = generateTokenResponse(user);
                res.send(user);
            }else{
                res.status(HTTP_BAD_REQUEST).send("This password is invalid!");
            } 
        }
    }
));

router.post("/reset", expressAsyncHandler(
    async (req, res) => {
        const email = req.body;
        const user  = await UserModel.findOne(email);
        if(!user){
            res.status(HTTP_BAD_REQUEST).send("User doesn't exist!");
        }else{
            const resetToken = generateResetTokenResponse(user);
            user.resetToken = resetToken;

            const resetUrl = `${process.env.WEB_HOST!}/reset-password-page`;

            const message = `Reset password in this page-link below. \n\n ${resetUrl}`

            await sendEmail({
                email: user.email,
                subject: "Password reset token",
                message
            })
            res.status(200).send("Email sent");
        }
    }
))

router.patch("/reset", expressAsyncHandler(
    async (req, res) => {
        const {email, password} = req.body;
        const user  = await UserModel.findOne({email: email});
        console.log(email)
        if(!user){
            res.status(HTTP_BAD_REQUEST).send("User doesn't exist!");
        }else{ 
            const hashedPassword = await bcrypt.hash(password, 8);
            await UserModel.findByIdAndUpdate(user.id,
            {
                password: hashedPassword,
            },
            {new: true});
        }
    }
))

router.get("/logout", expressAsyncHandler(
    async (req, res) => {
        const { id } = req.body;
        const user = await UserModel.findById(id);
        console.log(id)

        if(!user){
            res.status(HTTP_BAD_REQUEST).send("User doesn't exist to logout!");
        }else{
            user.token = '';
        }
        res.status(200).json({
            success: true,
            data: {}
          });
    }
));


router.get("/searchUser/:searchTerm", auth, expressAsyncHandler(
    async (req, res) =>{
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const users = await UserModel.find({name: {$regex:searchRegex}});
        res.send(users);
    }
));

router.get("/:userId", auth, expressAsyncHandler(
    async (req, res) =>{
        const user = await UserModel.findById(req.params.userId);
        res.send(user);
    }
));

router.put("/:userId", auth, expressAsyncHandler(
    async(req, res) => {

        const {name, email, password} = req.body;
        const user = await UserModel.findById(req.params.userId);

        const hashedPassword = await bcrypt.hash(password, 8);
        await UserModel.findByIdAndUpdate(req.params.userId,
        {
            name: name,
            email: email,
            password: hashedPassword,
        },
        {new: true});
    }
));

router.delete("/:userId", auth, expressAsyncHandler(
    async (req, res) =>{
        await UserModel.findByIdAndRemove(req.params.userId);
    }
));

router.post("/register", expressAsyncHandler(
    async(req, res) => {
        const {name, email, password, confirmPassword, isAdmin} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST).send("User all ready exist!")
        } else{
            const encryptedPassword = await bcrypt.hash(password, 8);
    
            const newUser:User = {
                id:'',
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                isAdmin: isAdmin,
                token: '',
                resetToken: '',
                tokens: ['', '']
            }

            const token = generateTokenResponse(newUser);
            newUser.token = token;

            const dbUser = await UserModel.create(newUser);
            res.send(dbUser);
        }
    }
));

const generateTokenResponse = (user: User) => { 
    const token = jwt.sign({
        id : user.id
    }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE
    });
    return token;
}

const generateResetTokenResponse = (user: User) => { 
    const token = jwt.sign({
        id : user.id
    }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_RESET_EXPIRE
    });
    return token;
}

export default router;

