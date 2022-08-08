import connection from "../db/postgres.js";


async function createUser(name, email, encryptedPassword){
    await connection.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
`, [name, email, encryptedPassword]);
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