import connection from "../db/postgres.js";

async function getUserData(user){
    const {rows: userData} = await connection.query(`
            SELECT users.id as id,users.name as name,SUM("visitCount") as "visitCount"
            , json_agg(json_build_object('id',urls.id,'shortUrl', urls."shortUrl",'url',urls.url,'visitCount',urls."visitCount")) AS "shortenedUrls"
            FROM urls JOIN users ON users.id="userId" WHERE "userId"= $1 GROUP BY users.id;
     `, [user.id]);
    return userData[0];
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
