import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn : document.querySelector('[ data-start]'),
    input: document.querySelector('#datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
}

  let intervalId = null;
  

  refs.startBtn.setAttribute('disabled', true);
  let selectUsersDates;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectUsersDates = selectedDates[0].getTime();
        checkValidDates (selectUsersDates);
        getTimerValue(selectUsersDates);
      console.log(selectedDates[0]);
    },
  };

flatpickr("#datetime-picker", options);

function checkValidDates (date) {
    if (date < options.defaultDate){
        alert ('Please choose a date in the future.');
        refs.startBtn.setAttribute('disable', true)
        return;
    } else {
       refs.startBtn.removeAttribute('disabled', true);
    }
};

function getTimerValue () {
  const resultTime = selectUsersDates - Date.now();
  const time = convertMs (resultTime);
  if (resultTime > 0) {
    updateClockFace(time)
  } else {
      clearInterval(intervalId);
  }
};

function updateClockFace({days, hours, minutes, seconds}) {
   refs.days.textContent = pad(days);
   refs.hours.textContent = pad(hours);
   refs.minutes.textContent = pad(minutes);
   refs.seconds.textContent = pad(seconds);
};


function pad (value) {
    return String(value).padStart(2,'0')
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  refs.startBtn.addEventListener('click', () => { 
    intervalId = setInterval(getTimerValue, 1000)
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  });
