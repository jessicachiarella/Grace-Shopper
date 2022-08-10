const client = require("./client");
const bcrypt = require('bcrypt');

async function createUser({ email, password, fullname, isAdmin=false }) {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT); 
    const {rows:[user]}  = await client.query(`
      INSERT INTO users(email, password, fullname, "isAdmin")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, fullname, "isAdmin";
    `, [email, hashedPassword, fullname, isAdmin]);
    
    return user;
  }


module.exports = {
    createUser
}