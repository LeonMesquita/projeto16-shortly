import signupSchema from '../schemas/authSchema.js';


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
    res.locals.user = user
    next();
}