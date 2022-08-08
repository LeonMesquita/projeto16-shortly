import connection from "../db/postgres.js";


async function shortenUrl(shortUrl, url, userId, date){
    await connection.query(`
        INSERT INTO urls ("shortUrl", url, "userId", "createdAt") VALUES ($1, $2, $3, $4)
    `, [shortUrl, url, userId, date]);
}


async function getUrl(id){
    const {rows: url} = await connection.query(`
        SELECT * FROM urls WHERE id=$1
    `, [id]);
    return url[0];

}


async function getUrlById(id){
    const {rows: url} = await connection.query(`
    SELECT id, "shortUrl", url FROM urls WHERE id=$1
`, [id]);
    return url[0];
}


async function openShortUrl(shortUrl){
    const {rows: url} = await connection.query(`
    SELECT * FROM urls WHERE "shortUrl" = $1
`, [shortUrl]);
return url[0];
}


async function updateVisitCount(visitorsCount, id){
    await connection.query(`
    UPDATE urls SET "visitCount" = $1 WHERE id = $2
`, [visitorsCount, id]);
}

async function deleteUrl(user, id){
    await connection.query(`
    DELETE FROM urls WHERE "userId" = $1 AND id = $2
    `, [user.id, id]);

}


export const urlRepository = {
    shortenUrl,
    getUrlById,
    deleteUrl,
    openShortUrl,
    updateVisitCount,
    getUrl
}