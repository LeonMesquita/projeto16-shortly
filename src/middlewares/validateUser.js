import connection from "../db/postgres.js";
import { nanoid } from 'nanoid'


export async function validateUser(req, res, next){
    const {authorization} = req.headers;
    if(!authorization){
        return res.sendStatus(401);
    }
    const token = authorization?.replace('Bearer ', '');
    try{
        const {rows: user} = await connection.query(`
            SELECT u.*, s.token FROM users u
            JOIN sessions s
            ON s."userId" = u.id
            WHERE s.token = $1
        `, [token]);
        if(user.length === 0){
            return res.status(404).send('No session found');
        }
        res.locals.user = user[0];
       
    }catch(error){
        return res.sendStatus(500);
    }
    
    next();
}