import { urlSchema } from "../schemas/urlSchema.js";

export async function validateUrl(req, res, next){

    const validate = urlSchema.validate(req.body);
    if(validate.error){
        return res.status(422).send(validate.error.message);
    }

    res.locals.url = req.body.url;

    next();
}