import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const client = new Pool ({
    user:"postgres",
    host: "localhost",
    database: "stutern_api",
    password: "asdfgjkl",
    port: 5432
})

client.on('connect', () => {
 console.log("we are connected")
})

client.on('error', (err)=>{
    console.log(`We have an ${err}`)
})

export default client;