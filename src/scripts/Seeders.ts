import { getConnection } from 'typeorm';
import { DataSeed } from '../database/seeders/DataSeed';
import createConnection from '../database/index';
import 'dotenv/config';

class SeederRun {
  public static async run() {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      try {
        const connection = await createConnection();
        console.log('\n== [Database connection] ==');

        const entitiesExists = await DataSeed.verifyEntities();
        if (entitiesExists) {
          console.log('\n== Database is already populated ==');
          await connection.query(`DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC`);
          console.log('\n== Database initialized ==');
        }
        await connection.runMigrations();
        console.log('\n== [Migrations run sucessfully] ==');

        await DataSeed.createUsers();
        await DataSeed.createOrganizations();
        await DataSeed.createBuildings();
        await DataSeed.createMaps();
        await DataSeed.createPoints();
        await DataSeed.associateUserOrganization();
        console.log('\n== [Seeders run successfully] ==');
      } catch (error) {
        console.log('\nError:', error);
      } finally {
        const connection = getConnection();
        await connection.close();
        console.log('\n== [Database connection closed] ==\n');
      }
    } else {
      console.log('Seeders should only be run in local environments');
    }
  }
}

SeederRun.run();
