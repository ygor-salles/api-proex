import { DataSeed } from "./DataSeed";
import createConnection from '../index';

class SeederRun {
  // eslint-disable-next-line prettier/prettier
  public static async run() {
    await DataSeed.createUsers();
  }
}

createConnection()
  .then(async () => {
    console.log('Database connection')
    SeederRun.run();
  })
  .catch(err => console.log('Database failure!', err));