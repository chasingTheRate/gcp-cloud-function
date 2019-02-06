/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const {BigQuery} = require('@google-cloud/bigquery');
const axios = require('axios');

async function updateSorts (req, res) {
  
  const postUrl = process.env.postUrl;
  const queryAsString = process.env.queryAsString

  // Creates a client
  const bigquery = new BigQuery();
  const options = {
    query: queryAsString,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  try {
    // Runs the query as a job
    const [job] = await bigquery.createQueryJob(options);
    // Waits for the query to finish
    const [rows] = await job.getQueryResults();
    // Post results to endpoint
    const response = await axios.post(postUrl, {data: rows});
    res.status(200).send('Sent data successfully!');
  } catch (e) {
    console.log(e);
    res.status(500).send('Error :(');
  }
};

exports.updateSorts = updateSorts;
