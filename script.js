
// Selecting elements from the DOM
const currentTime = document.querySelector("h1"),
  content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector("button");

// Initializing variables
let alarmTime, isAlarmSet,
  ringtone = new Audio("./files/ringtone.mp3");

// Creating options for the hour dropdown
for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Creating options for the minute dropdown
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Creating options for the AM/PM dropdown
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Updating the current time every second
setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

  // Formatting hours and AM/PM
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? h = 12 : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  // Displaying the current time
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  // Checking if it's time for the alarm
  if (isAlarmSet && alarmTime === `${h}:${m} ${ampm}`) {
    // Playing the ringtone and setting it to loop
    ringtone.play();
    ringtone.loop = true;
    alert("Alarm!");
  }
});

// Function to set/clear the alarm
function setAlarm() {
  if (isAlarmSet) {
    // Clearing the alarm if it's set
    alarmTime = "";
    ringtone.pause();
    setAlarmBtn.innerText = "Set Alarm";
    return isAlarmSet = false;
  }

  // Setting the alarm if not set
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
    // Displaying an alert if the selected time is invalid
    return alert("Please, select a valid time to set Alarm!");

    
    alarmTime = time;
    isAlarmSet = true;
    setAlarmBtn.innerText = "Stop Alarm";
  }

    // Adding the alarm to the list
    const listItem = document.createElement('li');
    listItem.textContent = time;

    // Create a delete button for the alarm
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        listItem.remove();
    };

    listItem.appendChild(deleteButton);
    alarmList.appendChild(listItem);

    alarmTime = time;
    isAlarmSet = true;
    setAlarmBtn.innerText = "Click for your next Alarm";
}

  /*}
  alarmTime = time;
  isAlarmSet = true;
  setAlarmBtn.innerText = "Stop Alarm";
}*/

// Event listener for the set/clear alarm button
setAlarmBtn.addEventListener("click", setAlarm);
