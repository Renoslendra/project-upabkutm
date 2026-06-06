(async ()=>{
  const db = require('./config/db');
  try{
    const [rows] = await db.query("SELECT id, judul FROM informasi_universitas LIMIT 5");
    console.log('ROWS:', rows);
  }catch(e){
    console.error('DB ERROR', e);
  } finally{
    process.exit(0);
  }
})();
