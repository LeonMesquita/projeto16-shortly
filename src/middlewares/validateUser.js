import connection from "../db/postgres.js";
import { nanoid } from 'nanoid'
import jwt from 'jsonwebtoken';


export async function validateUser(req, res, next){
    const {authorization} = req.headers;
    if(!authorization){
        return res.sendStatus(401);
    }
    const token = authorization?.replace('Bearer ', '');
    const secretKey = process.env.JWT_SECRET;

    try {
        const userData = jwt.verify(token, secretKey);
        const {rows: user} = await connection.query(`
        SELECT * FROM users
        WHERE email = $1
    `, [userData.email]);
    if(user.length === 0){
        return res.status(400).send('User not found');
    }
    res.locals.user = user[0];
    next();

    } catch {
        return res.status(401).send('Authentication error');
    }
    

    
}

// try{
//     const {rows: user} = await connection.query(`
//         SELECT u.*, s.token FROM users u
//         JOIN sessions s
//         ON s."userId" = u.id
//         WHERE s.token = $1
//     `, [token]);
//     if(user.length === 0){
        
//     }
//     res.locals.user = user[0];
//    next();
// }catch(error){
//     return res.sendStatus(500);
// }