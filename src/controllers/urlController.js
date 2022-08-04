import connection from "../db/postgres.js";
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid'

export async function shortenUrl(req, res){
    const url = res.locals.url;
    const user = res.locals.user;
    const shortUrl = nanoid(8);
    const date = new Date;
    console.log(user)
    try{
        await connection.query(`
            INSERT INTO urls ("shortUrl", url, "userId", "createdAt") VALUES ($1, $2, $3, $4)
        `, [shortUrl, url, user.id, date]);
        return res.status(201).send({shortUrl});
    }catch(error){
        return res.sendStatus(500);
    }
}


export async function getUrlById(req, res){
    const id = req.params.id;
    try{
        const {rows: url} = await connection.query(`
            SELECT id, "shortUrl", url FROM urls WHERE id=$1
        `, [id]);
        if(url.length === 0){
            return res.sendStatus(404);
        }

        return res.status(200).send(url[0]);
    }catch(error){
        return res.sendStatus(500);
    }
}


export async function openShortUrl(req, res){
    const shortUrl = req.params.shortUrl;
    try{
        const {rows: url} = await connection.query(`
            SELECT * FROM urls WHERE "shortUrl" = $1
        `, [shortUrl]);
        if(url.length === 0){
            return res.sendStatus(404);
        }
        const visitorsCount = url[0].visitCount + 1;
        await connection.query(`
            UPDATE urls SET "visitCount" = $1 WHERE id = $2
        `, [visitorsCount, url[0].id]);
        res.redirect(url[0].url);
    }catch(error){
        return res.sendStatus(500);
    }

}


export async function deleteUrl(req, res){

}