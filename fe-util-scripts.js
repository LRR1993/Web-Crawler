// takes the input from the html and delivers it to the back-end crawler

const inputField = [...document.getElementsByClassName("form")][0]
const requestButton = [...document.getElementsByClassName("requestButton")]

requestButton.addEventListener("click", event => {
  event.preventDefault();
  console.log("requested page for crawling");
  requestForm(inputField);
});

