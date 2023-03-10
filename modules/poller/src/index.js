const env = require('./env');
const dba = require('./db');

dba.init(env.dbUrl, env.dbName);

const job = async () => {
    const db = await dba.open();
    await dba.setStatusCompleted(db);
    await dba.close(); 
}

job();