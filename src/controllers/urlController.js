import { nanoid } from 'nanoid';
import {urlRepository} from '../repository/urlRepository.js';



export async function shortenUrl(req, res){
    const url = res.locals.url;
    const user = res.locals.user;
    const shortUrl = nanoid(8);

    try{
        urlRepository.shortenUrl(shortUrl, url, user.id);
        return res.status(201).send({shortUrl});
    }catch(error){
        return res.sendStatus(500);
    }
}


export async function getUrlById(req, res){
    const id = req.params.id;
    try{
        const url = await urlRepository.getUrlById(id);
        if(!url){
            return res.sendStatus(404);
        }

        return res.status(200).send(url);
    }catch(error){
        return res.sendStatus(500);
    }
}


export async function openShortUrl(req, res){
    const shortUrl = req.params.shortUrl;
    try{
        const url = await urlRepository.openShortUrl(shortUrl);
        if(!url){
            return res.sendStatus(404);
        }
        const visitorsCount = url.visitCount + 1;
        await urlRepository.updateVisitCount(visitorsCount, url.id);
        res.redirect(200, `${url.url}`);
    }catch(error){
        return res.sendStatus(500);
    }

}


export async function deleteUrl(req, res){
    const user = res.locals.user;
    const id = req.params.id;
    try{
        const url = await urlRepository.getUrl(id);
        if(!url){
            return res.sendStatus(404);
        }

        if(url.userId !== user.id){
            return res.sendStatus(401);
        }
        urlRepository.deleteUrl(user, id);
        return res.sendStatus(204);
    }catch(error){
        console.log(error)
        return res.sendStatus(500);

    }
}