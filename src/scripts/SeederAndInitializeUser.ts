import { DataSeed } from '../database/seeders/DataSeed';
import createConnection from '../database/index';
import 'dotenv/config';

class SeederAndInitializeUser {
  public static async run(): Promise<void> {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      if (process.env.INIT_USER_EMAIL && process.env.INIT_USER_PASSWORD) {
        try {
          const connection = await createConnection();
          console.log('\n== [Database connection] ==');

          const entitiesExists = await DataSeed.verifyEntities();
          if (entitiesExists) {
            console.log('\n== Database is already populated ==\n');
            await connection.query(`DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC`);
            console.log('== Database initialized ==\n');
          }
          await connection.runMigrations();
          console.log('\n== [Migrations run sucessfully] ==');

          await DataSeed.createOneOrganization();
          await DataSeed.createOneUser();
          console.log('\n== [Seeders run successfully] ==\n');
        } catch (error) {
          console.log('\nError:', error);
        }
      } else {
        console.log(
          `The first users email and password environment variables must be set ("INIT_USER_EMAIL", "INIT_USER_PASSWORD")`,
        );
      }
    } else {
      console.log('Seeders should only be run in local environments');
    }
  }
}

SeederAndInitializeUser.run();
