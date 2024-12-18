// Load the config module
const config = require('config');

// Access configuration values
const appName = config.get('app.name');
const port = config.get('app.port');
const dbHost = config.get('database.host');
const dbPort = config.get('database.port');
const dbName = config.get('database.db_name');

// Use the configuration values in your program
console.log(`App Name: ${appName}`);
console.log(`App Port: ${port}`);
console.log(`Database Host: ${dbHost}`);
console.log(`Database Port: ${dbPort}`);
console.log(`Database Name: ${dbName}`);