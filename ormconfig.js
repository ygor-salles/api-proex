require('dotenv').config();

const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build';
const extensionFile = process.env.NODE_ENV === 'development' ? 'ts' : 'js';

const extraObj = process.env.NODE_ENV === 'development' ? {} : {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
}

module.exports = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT || 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    extra: extraObj,
    migrations: [rootDir + `/database/migrations/*.${extensionFile}`],
    entities: [rootDir + `/entities/*.${extensionFile}`],
    cli: {
        migrationsDir: rootDir + '/database/migrations'
    }
}