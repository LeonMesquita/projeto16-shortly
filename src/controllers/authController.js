import connection from "../db/postgres.js";
import bcrypt from 'bcrypt';


export async function registerUser(req, res){
    const user = res.locals.user;
    const date = new Date;
    const encryptedPassword = bcrypt.hashSync(user.password, 10);
    try{
        await connection.query(`
            INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, $4)
        `, [user.name, user.email, encryptedPassword, date]);
        return res.sendStatus(200);
    }catch(error){
        return res.sendStatus(500);
    }

}




export async function loginUser(req, res){

}