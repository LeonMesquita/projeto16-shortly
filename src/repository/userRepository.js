import connection from "../db/postgres.js";


async function getUserData(user){
    let newData;
    const shortenedUrls = [];
    let visitCount = 0;

    const {rows: userData} = await connection.query(`
        SELECT users.id, users.name, urls.id as "urlId", urls."shortUrl", urls.url, urls."visitCount" FROM users
        JOIN urls ON urls."userId" = users.id
        WHERE users.id = $1
        GROUP BY users.id, urls.id
     `, [user.id]);

     newData = {
        id: userData[0]?.id,
        name: userData[0]?.name
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
   

    return newData;
}


async function getRanking(){
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
const {rows: ranking} = await connection.query(query);
return ranking;

}

export const userRepository = {
    getUserData,
    getRanking
}