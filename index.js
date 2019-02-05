/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const {BigQuery} = require('@google-cloud/bigquery');
const axios = require('axios');

async function helloWorld (req, res) {
  
  const tableName = process.env.tableName;
  console.log(`tableName: ${tableName}`);
  console.log(`Env: ${process.env.NODE_ENV}`);
  
    // Creates a client
  const bigquery = new BigQuery();

  const query = `SELECT name
    FROM \`${tableName}\`
    WHERE state = 'TX'
    LIMIT 100`;
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Runs the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Waits for the query to finish
  const [rows] = await job.getQueryResults();
  
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    res.status(200).send(response.data);
  } catch (e) {
    res.status(200).send('error');
  }

};

exports.helloWorld = helloWorld;
