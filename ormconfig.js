require('dotenv').config();

let config = {};
if (process.env.NODE_ENV === 'development') {
  config = {
    type: 'postgres',
    host: process.env.BD_HOST,
    port: process.env.BD_PORT || 5432,
    username: process.env.BD_USERNAME,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    synchronize: false,
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/entities/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };
} else if (process.env.NODE_ENV === 'test') {
  config = {
    type: 'postgres',
    host: process.env.BD_TEST_HOST,
    port: process.env.BD_TEST_PORT || 5432,
    username: process.env.BD_TEST_USERNAME,
    password: process.env.BD_TEST_PASSWORD,
    database: process.env.BD_TEST_DATABASE,
    synchronize: false,
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/entities/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };
} else if (process.env.NODE_ENV === 'homolog') {
  config = {
    type: 'postgres',
    host: process.env.BD_HOMOLOG_HOST,
    port: process.env.BD_HOMOLOG_PORT || 5432,
    username: process.env.BD_HOMOLOG_USERNAME,
    password: process.env.BD_HOMOLOG_PASSWORD,
    database: process.env.BD_HOMOLOG_DATABASE,
    synchronize: false,
    extra: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    migrations: ['build/database/migrations/*.js'],
    entities: ['build/entities/*.js'],
    cli: {
      migrationsDir: 'build/database/migrations',
    },
  };
} else if (process.env.NODE_ENV === 'production') {
  config = {
    type: 'postgres',
    host: process.env.BD_PROD_HOST,
    port: process.env.BD_PROD_PORT || 5432,
    username: process.env.BD_PROD_USERNAME,
    password: process.env.BD_PROD_PASSWORD,
    database: process.env.BD_PROD_DATABASE,
    synchronize: false,
    extra: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    migrations: ['build/database/migrations/*.js'],
    entities: ['build/entities/*.js'],
    cli: {
      migrationsDir: 'build/database/migrations',
    },
  };
}

module.exports = config;
