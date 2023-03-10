const env = require('env-var');

// ...
const dbUrl 
    = env.get('DB_URL').required().asString();
        
const dbName 
    = env.get('DB_NAME').required().asString();

module.exports = {
    dbName,
    dbUrl
};

/*
module.exports = {
};
*/