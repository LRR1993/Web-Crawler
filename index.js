///http request

const http = require('http');
const fs = require('fs');

const options = new URL('http://broken-links-api.herokuapp.com/');
const badLinks = [];
const goodLinks = [];

http
  .get(options, res => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
    }

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

        linkArr.forEach(link => {
          http
            .get(`${options}${link}`, res => {
              if (res.statusCode !== 200) {
                fs.appendFile('badlinks.txt', `${options}${link},`, err => {
                  if (err) throw err;
                  console.log('The "data to append" was appended to file!');
                });
              } else {
                fs.appendFile('goodlinks.txt', `${options}${link},`, err => {
                  if (err) throw err;
                  console.log('The "data to append" was appended to file!');
                });
              }
            })
            .on('error', e => {
              console.error(`Got error: ${e.message}`);
            });
        });
      } catch (e) {
        console.error(e.message);
      }
    });
  })
  .on('error', e => {
    console.error(`Got error: ${e.message}`);
  });
