// takes the input from the html and delivers it to the back-end crawler
// impirt is not correct
// import requestCrawl from './requestCrawl.js';


const inputField = [...document.getElementsByClassName('form')][0];
const requestButton = [...document.getElementsByClassName('requestButton')][0];

requestButton.addEventListener('click', event => {
  event.preventDefault();
  console.log(`requested ${inputField.value} for crawling`);
  // const results = requestCrawl(inputField.value);
  const results = [['Chart thing', 'Chart amount'],['good', 4], ['bad', 6]];
  drawChart(results);
});

function drawChart (results) {
  google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
  
        function drawChart() {
  
          var data = google.visualization.arrayToDataTable(results);
  
          var options = {
            title: 'My Daily Activities'
          };
  
          var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  
          chart.draw(data, options);
        }
}
