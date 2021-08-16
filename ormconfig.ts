import 'dotenv/config';

const { BD_HOST, BD_PORT, BD_NAME, BD_USERNAME, BD_PASSWORD } = process.env;

export default {
    type: 'postgres',
    host: BD_HOST,
    port: BD_PORT,
    username: BD_USERNAME,
    password: BD_PASSWORD,
    database: BD_NAME,
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/entities/*.ts'],
    cli: {
        migrationsDir: './src/database/migrations'
    }
}