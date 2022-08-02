import connection from "../db/postgres.js";


export async function registerUser(req, res){
    try{

        return res.sendStatus(200);
    }catch(error){
        return res.sendStatus(500);
    }

}




export async function loginUser(req, res){

}