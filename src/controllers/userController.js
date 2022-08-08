import {userRepository} from '../repository/userRepository.js';


export async function getUserData(req, res){
    const user = res.locals.user;
    try{
        const userData = await userRepository.getUserData(user);
        if(!userData){
            return res.status(200).send(
                {
                    id: user.id,
                    name: user.name,
                    visitCount: 0,
                    shortenedUrls: []
                }
            );
        }
        return res.status(200).send(userData);
    }catch(error){
        console.log(error)
        return res.sendStatus(500);
    }
}


export async function getRanking(req, res){
    try{
        const ranking = await userRepository.getRanking();
        res.status(200).send(ranking);
    }catch(error){
        return res.sendStatus(500);
    }
}