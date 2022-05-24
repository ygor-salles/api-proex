import { getConnection } from 'typeorm';
import { DataSeed } from '../database/seeders/DataSeed';
import createConnection from '../database/index';
import 'dotenv/config';

const EMAIL_ENV = process.env.INIT_USER_EMAIL;
const PASSWORD_ENV = process.env.INIT_USER_PASSWORD;

class SeederAndInitializeUser {
  public static async run(): Promise<void> {
    if (EMAIL_ENV && PASSWORD_ENV) {
      try {
        const connection = await createConnection();
        console.log('\n== [Database connection] ==');

        const entitiesExists = await DataSeed.verifyEntities();

        if (entitiesExists) {
          console.log('\n== Database is already populated ==');

          if (await DataSeed.findUserByEmail(EMAIL_ENV)) {
            console.log('\n== User Already exists ==');
            return;
          }
        } else {
          await connection.runMigrations();
          console.log('\n== [Migrations run sucessfully] ==');
        }

        await DataSeed.createOneOrganization();
        await DataSeed.createOneUser();
        console.log('\n== [User registered successfully] ==');
      } catch (error) {
        console.log('\nError:', error);
      } finally {
        const connection = getConnection();
        await connection.close();
        console.log('\n== [Database connection closed] ==\n');
      }
    } else {
      console.log(
        `The first users email and password environment variables must be set ("INIT_USER_EMAIL", "INIT_USER_PASSWORD")`,
      );
    }
  }
}

SeederAndInitializeUser.run();
