const config = require('config');

const appName = config.get('app.name');
const port = config.get('app.port');
const env = config.get('app.env');
const dbHost = config.get('database.host');
const dbPort = config.get('database.port');
const dbName = config.get('database.db_name');

console.log(`App Name: ${appName}`);
console.log(`App Environment: ${env}`);
console.log(`App Port: ${port}`);
console.log(`Database Host: ${dbHost}`);
console.log(`Database Port: ${dbPort}`);
console.log(`Database Name: ${dbName}`);