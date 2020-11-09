// function for loading text
function loadEvents() {
  for (let i = 9; i <= 17; i++) {
    $(`#${i}-text`).val(localStorage.getItem(i));
  }
}

// function for changing text
function saveText() {
  // distinguise btn value is being used using $(this) keyword
  let btnValue = $(this).val();
  // using that btns value, select the corrosponding text area
  let text = $(`#${btnValue}-text`).val();
  // push to localStorage
  localStorage.setItem(btnValue, text);
}

// function to handle displaying current date in html
function currentDay() {
  let currentDayEl = $('#currentDay');
  currentDayEl.text(moment().format('dddd, MMM Do'));
}

// function to handle coloring rows by past/present/future
function timeHandler() {
  let currentHour = parseInt(moment().format('h'));
  
  $('.description').each(function () {
    // get the time out of the descriptions id, and use that to compare to current
    let elementID = $(this).attr('id');
    let elementTime = parseInt(elementID);
    let currentTime;
    console.log(moment().format('h a'));
    // using 24 hour time for comparison
    // since using 24 hour time, we need to check if we need to add 12 to it, (5pm = 12 + 5 = 17 (1700 hrs), depending on am/pm)
    if (moment().format('a') === 'am' && moment().format('h a') != '12 am' || moment().format('h a') === '12 pm' && moment().format('h a') != '12 am') {
      currentTime = parseInt(moment().format('h'));
    } else if (moment().format('a') === 'pm' || moment().format('h a') === '12 am') {
      currentTime = parseInt(moment().format('h')) + 12;
    }

    //console.log(currentTime, elementTime, moment().format('a'));
    if (elementTime === currentTime) {
      // set to present (ex. 9 - 9:59 is current hour)
      $(this).parent().attr('class', 'row time-block present');
    } else if (elementTime < currentTime) {
      // set to past
      $(this).parent().attr('class', 'row time-block past');
    } else {
      // set to future
      $(this).parent().attr('class', 'row time-block future');
    }

  });
}

// keep running our time function to check current time, and change color of time blocks, update half a second
let updateLoop = setInterval(() => {
  timeHandler();
},500);

// listener to load current events and print current day when page is loaded
$(document).ready(function() {
  loadEvents()
  currentDay()
});

// listener to save text
$(".saveBtn").on("click", saveText);

