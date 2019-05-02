const http = require('http');

const inputField = [...document.getElementsByClassName("form")][0];
const requestButton = [...document.getElementsByClassName("requestButton")];
const goodLinks = [];
const badLinks = [];

console.log(document.getElementsByClassName("form").item(0))

requestButton.addEventListener("click", event => {
  event.preventDefault();
  console.log(`requested ${inputField.value} for crawling`);
  requestCrawl(inputField.value).then(() => {
      console.log('bL', badLinks)
      console.log('gL', goodLinks)
  });

  const results = [["Chart thing", "Chart amount"], ["good", 4], ["bad", 6]];
  drawChart(results);
});

function drawChart(results) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    const data = google.visualization.arrayToDataTable(results);
    const options = {
      title: "My Daily Activities"
    };
    const chart = new google.visualization.PieChart(
      document.getElementById("piechart")
    );
    chart.draw(data, options);
  }
}

function requestCrawl(url) {
  http
    .get(url, res => {
      const { statusCode } = res;
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
                  badLinks.concat(`${options}${link}`)
                } else {
                  goodLinks.concat(`${options}${link}`)
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
}
