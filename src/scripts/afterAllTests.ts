import { Client } from 'pg';
import 'dotenv/config';

async function dropDatabase() {
  const client = new Client({
    connectionString: process.env.BD_URL_TEST,
  });

  await client.connect();
  await client.query('DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC');
  await client.end();
  return process.env.BD_TEST_DATABASE || '';
}

dropDatabase()
  .then((db: string) => console.log(`\n== [Test database ${db} deleted successfully] ==\n`))
  .catch(err => console.log('\nError: ', err));
