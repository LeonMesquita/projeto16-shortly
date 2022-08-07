import connection from "../db/postgres.js";


export async function getUserData(req, res){
    const user = res.locals.user;
    let newData;
    const shortenedUrls = [];
    let visitCount = 0;

    try{
       const {rows: userData} = await connection.query(`
       SELECT users.id, users.name, urls.id as "urlId", urls."shortUrl", urls.url, urls."visitCount" FROM users
       JOIN urls ON urls."userId" = users.id
       WHERE users.id = $1
       GROUP BY users.id, urls.id
        `, [user.id]);

        newData = {
            id: userData[0].id,
            name: userData[0].name
        }
        
        for(let count = 0; count < userData.length; count++){
            const data = userData[count];
            const newObj = {
                id: data.urlId,
                shortUrl: data.shortUrl,
                url: data.url,
                visitCount: data.visitCount
            }
            visitCount += Number(data.visitCount);
            shortenedUrls.push(newObj);
        }
        newData['visitCount'] = visitCount;
        newData['shortenedUrls'] = shortenedUrls;
        return res.status(200).send(newData);
    }catch(error){
        return res.sendStatus(500);
    }
}


export async function getRanking(req, res){
    const query = `
    SELECT users.id, users.name, COUNT(urls.id) as "linksCount",
    SUM(CASE WHEN urls."userId" = users.id
    THEN urls."visitCount"
    ELSE 0 END)
    AS "visitCount" FROM users
    LEFT JOIN urls ON urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `;
    try{
        const {rows: ranking} = await connection.query(query);
        res.status(200).send(ranking);
    }catch(error){
        return res.sendStatus(500);
    }
}