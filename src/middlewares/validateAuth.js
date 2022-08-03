import {signupSchema, signinSchema} from '../schemas/authSchema.js';

import connection from "../db/postgres.js";


export async function validateSignup(req, res, next){
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    if(req.body.confirmPassword !== user.password){
        return res.status(422).send('The passwords do not match');
    }                                                 

    const validate = signupSchema.validate(user);
    if(validate.error){
        return res.status(422).send(validate.error.message);
    }

    const {rows: findUser} = await connection.query(`
        SELECT * FROM users WHERE email = $1
    `, [user.email]);
    if(findUser.length > 0){
        return res.status(409).send('This email already exists');
    }

    res.locals.user = user;
    next();
}


export async function validateSignin(req, res, next){
    const user = req.body;
    const validate = signinSchema.validate(user);
    if(validate.error){
        return res.status(422).send(validate.error.message);
    }

    

    res.locals.user = user;
    next();

}