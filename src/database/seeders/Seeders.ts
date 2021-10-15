import { DataSeed } from "./DataSeed";
import createConnection from '../index';
import 'dotenv/config';

class SeederRun {
  // eslint-disable-next-line prettier/prettier
  public static async run() {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      console.log('\n[Running seeders]... \n');
      await DataSeed.createUsers();
      await DataSeed.createOrganizations();
      await DataSeed.createBuildings();
      await DataSeed.createMaps();
      await DataSeed.createPoints();
      console.log('**[Seeders run successfully]** \n')
    }
    else {
      console.log('Seeders should only be run in local environments');
    }
  }
}

createConnection()
  .then(async () => {
    console.log('Database connection');
    SeederRun.run();
  })
  .catch(err => console.log('Database failure!', err));