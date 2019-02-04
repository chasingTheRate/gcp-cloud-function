/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

import { BigQuery } from '@google-cloud/bigquery';

async function helloWorld (req, res) {
  
  const tableName = process.env.tableName;
  
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
  
  res.status(200).send(rows);
};

const _helloWorld = helloWorld;
export { _helloWorld as helloWorld };
