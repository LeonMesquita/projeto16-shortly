import connection from "../db/postgres.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export async function registerUser(req, res){
    const user = res.locals.user;
    const date = new Date;
    const encryptedPassword = bcrypt.hashSync(user.password, 10);
    try{
        await connection.query(`
            INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, $4)
        `, [user.name, user.email, encryptedPassword, date]);
        return res.sendStatus(201);
    }catch(error){
        return res.sendStatus(500);
    }

}




export async function loginUser(req, res){
    const user = res.locals.user;
    const chaveSecreta = process.env.JWT_SECRET;
    try{
        const {rows: findUser} = await connection.query(`
        SELECT * FROM users WHERE email = $1
    `, [user.email]);
    if(findUser.length === 0){
        return res.status(404).send('User not found');
    }

    if(!bcrypt.compareSync(user.password, findUser[0].password)){
        return res.status(401).send('Incorrect email or password');
    }
    const token = jwt.sign(user, chaveSecreta);
    

    return res.status(200).send(token);

    }catch(error){
        return res.sendStatus(500)
    }
    

    
}

// await connection.query(`
// INSERT INTO sessions (token, "userId") VALUES ($1, $2)
// `, [token, findUser[0].id]);