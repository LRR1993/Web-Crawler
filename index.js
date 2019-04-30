///http request

const http = require('http');
const fs = require('fs');

const options = new URL('http://broken-links-api.herokuapp.com/');

http
  .get(options, res => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    console.log(res.headers);
    // let error;
    // if (statusCode !== 200) {
    //   error = new Error('Request Failed.\n' +
    //     `Status Code: ${statusCode}`);
    // } else if (!/^application\/json/.test(contentType)) {
    //   error = new Error('Invalid content-type.\n' +
    //     `Expected application/json but received ${contentType}`);
    // }
    // if (error) {
    //   console.error(error.message);
    //   // Consume response data to free up memory
    //   res.resume();
    //   return;
    // }

    // res.setEncoding('utf8');
    // let rawData = '';
    // res.on('data', (chunk) => { rawData += chunk; });
    // res.on('end', () => {
    //   try {
    //     const parsedData = JSON.parse(rawData);
    //     console.log(parsedData);
    //   } catch (e) {
    //     console.error(e.message);
    //   }
    // });
  })
  .on('error', e => {
    console.error(`Got error: ${e.message}`);
  });
