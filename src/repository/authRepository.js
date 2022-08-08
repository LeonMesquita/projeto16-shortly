import connection from "../db/postgres.js";


async function createUser(name, email, encryptedPassword){
    const date = new Date;
    await connection.query(`
    INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, $4)
`, [name, email, encryptedPassword, date]);
}



async function loginUser(user){
    const {rows: findUser} = await connection.query(`
    SELECT * FROM users WHERE email = $1
`, [user.email]);
return findUser[0];
}


export const authRepository = {
    createUser,
    loginUser
}