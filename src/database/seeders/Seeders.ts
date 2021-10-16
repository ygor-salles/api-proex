import { DataSeed } from "./DataSeed";
import createConnection from '../index';
import 'dotenv/config';

class SeederRun {
  // eslint-disable-next-line prettier/prettier
  public static async run() {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      try {
        const connection = await createConnection();
        console.log('\n== [Database connection] ==');

        const entitiesExists = await DataSeed.verifyEntities();
        if (!entitiesExists) {
          await connection.runMigrations();
          console.log('\n== [Migrations run sucessfully] ==');

          await DataSeed.createUsers();
          await DataSeed.createOrganizations();
          await DataSeed.createBuildings();
          await DataSeed.createMaps();
          await DataSeed.createPoints();
          console.log('\n== [Seeders run successfully] ==\n')
        } else {
          console.log('== Database is already populated ==\n');
        }
      } catch (error) {
        console.log('\nError:', error);
      }

    }
    else {
      console.log('Seeders should only be run in local environments');
    }
  }
}

SeederRun.run();