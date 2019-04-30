// takes the input from the html and delivers it to the back-end crawler
// impirt is not correct
import requestCrawl from './requestCrawl.js'

const inputField = [...document.getElementsByClassName("form")][0]
const requestButton = [...document.getElementsByClassName("requestButton")][0]

requestButton.addEventListener("click", event => {
  event.preventDefault();
  console.log(`requested ${inputField.value} for crawling`);
  requestCrawl(inputField.value);
});