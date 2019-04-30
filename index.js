///http request

const http = require('http');
const fs = require('fs');

const options = new URL('http://broken-links-api.herokuapp.com/');

http
  .get(options, res => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
    }
    // else if (!/^application\/json/.test(contentType)) {
    //   error = new Error('Invalid content-type.\n' +
    //     `Expected application/json but received ${contentType}`);
    // }
    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', chunk => {
      rawData += chunk;
    });
    res.on('end', () => {
      try {
        const re = /<a\shref="\/([a-z0-9]*\.html)">/gi;
        const linkArr = [];
        let result;
        while ((result = re.exec(rawData)) !== null) {
          linkArr.push(result[1]);
        }
        console.log(linkArr);
      } catch (e) {
        console.error(e.message);
      }
    });
  })
  .on('error', e => {
    console.error(`Got error: ${e.message}`);
  });

// if (linkArray.length < 0) {
//   linkArray.forEach(link =>

//     )

// }
