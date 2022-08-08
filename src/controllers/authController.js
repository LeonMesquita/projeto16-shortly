import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {authRepository} from '../repository/authRepository.js';
dotenv.config();


export async function registerUser(req, res){
    const user = res.locals.user;
    const encryptedPassword = bcrypt.hashSync(user.password, 10);
    try{
        await authRepository.createUser(user.name, user.email, encryptedPassword);
        return res.sendStatus(201);
    }catch(error){
        return res.sendStatus(500);
    }

}




export async function loginUser(req, res){
    const user = res.locals.user;
    const chaveSecreta = process.env.JWT_SECRET;
    try{
        const findUser = await authRepository.loginUser(user);
    if(!findUser){
        return res.status(404).send('User not found');
    }

    if(!bcrypt.compareSync(user.password, findUser.password)){
        return res.status(401).send('Incorrect email or password');
    }
    const token = jwt.sign(user, chaveSecreta);
    

    return res.status(200).send(token);

    }catch(error){
        return res.sendStatus(500)
    } 
}