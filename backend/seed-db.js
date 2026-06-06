const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

(async ()=>{
  try{
    const sql = fs.readFileSync('../sql/upabk.sql', 'utf8');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });
    await conn.query(sql);
    console.log('SQL file executed successfully');
    await conn.end();
  }catch(e){
    console.error('SEED ERROR', e);
    process.exit(1);
  }
})();
