// takes the input from the html and delivers it to the back-end crawler
// impirt is not correct
// import requestCrawl from './requestCrawl.js';

import {GoogleCharts} from 'google-charts';

GoogleCharts.load(drawChart);

const inputField = [...document.getElementsByClassName('form')][0];
const requestButton = [...document.getElementsByClassName('requestButton')][0];

requestButton.addEventListener('click', event => {
  event.preventDefault();
  console.log(`requested ${inputField.value} for crawling`);
  // const results = requestCrawl(inputField.value);
  const results = [['Chart thing', 'Chart amount']['good', 4], ['bad', 6]];
  drawChart(results);
});

function drawChart(results) {
  const data = GoogleCharts.api.visualization.arrayToDataTable(results);

  //   const options = {
  //     pieHole: 0.8,
  //     pieSliceTextStyle: {
  //         color: 'black',
  //     },
  //     slices: {
  //         0: {color: '#7ec252'},
  //         1: {color: '#a4ce57'},
  //         2: {color: '#cfe4ad'}
  //     },
  //     legend: {
  //         position: 'bottom',
  //         textStyle: {
  //             color: 'black',
  //             fontSize: 13,
  //             fontName: 'EncodeSans'
  //         }
  //     },
  //     title: 'Chart 1',
  //     titleTextStyle: {
  //         color: 'black',
  //         fontSize: 13,
  //         fontName: 'EncodeSans'
  //     },
  //     chartArea: {left: 0, top: 0, width: '100%', height: '80%'},
  //     pieSliceText: 'none'
  // };
  // advanced options

  const chart = new GoogleCharts.api.visualization.PieChart(
    document.getElementById('pieChart')
  );
  chart.draw(data);
  // chart.draw(data, options);
  // for the advanced option
}
