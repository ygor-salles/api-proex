require('dotenv').config();

const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build';
const extensionFile = process.env.NODE_ENV === 'development' ? 'ts' : 'js';

module.exports = {
    type: 'postgres',
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME,
    synchronize: false,
    extra: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    migrations: [rootDir+`/database/migrations/*.${extensionFile}`],
    entities: [rootDir+`/entities/*.${extensionFile}`],
    cli: {
        migrationsDir: rootDir+'/database/migrations'
    }
}