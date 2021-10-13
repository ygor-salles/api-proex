// eslint-disable-next-line import/no-extraneous-dependencies
const NodeEnvironment = require('jest-environment-node');
// const createConnection = require('.');

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.connectionBD = {
      type: 'postgres',
      host: process.env.BD_TEST_HOST,
      port: +process.env.BD_TEST_PORT || 5432,
      username: process.env.BD_TEST_USERNAME,
      password: process.env.BD_TEST_PASSWORD,
      database: process.env.BD_TEST_DATABASE,
      synchronize: false,
    };
  }

  setup() {
    process.env.BD_TEST_HOST = this.connectionBD.host;
    process.env.BD_TEST_PORT = this.connectionBD.port;
    process.env.BD_TEST_USERNAME = this.connectionBD.username;
    process.env.BD_TEST_PASSWORD = this.connectionBD.password;
    process.env.BD_TEST_DATABASE = this.connectionBD.database;

    this.global.process.env.BD_TEST_HOST = this.connectionBD.host;
    this.global.process.env.BD_TEST_PORT = this.connectionBD.port;
    this.global.process.env.BD_TEST_USERNAME = this.connectionBD.username;
    this.global.process.env.BD_TEST_PASSWORD = this.connectionBD.password;
    this.global.process.env.BD_TEST_DATABASE = this.connectionBD.database;

    // rodar as migrations
  }

  teardown() {}
}

module.exports = CustomEnvironment;
