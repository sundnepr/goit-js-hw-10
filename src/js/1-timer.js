import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userDate;
let intervalId;

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userDate = selectedDates[0];

    if (userDate > new Date()){
      refs.startBtn.disabled = false;
    }
    else{
      izitoast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        titleColor: '#fff',
        titleSize: '16px',
        progressBarColor: '#B51B1B',
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
    };
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {

    refs.startBtn.disabled = true;
    refs.inputDate.disabled = true;

    const currentTime = Date.now();
    const diff = userDate - currentTime;
    const time = convertMs(diff);
    refs.days.textContent = time.days.toString().padStart(2, '0');
    refs.hours.textContent = time.hours.toString().padStart(2, '0');
    refs.minutes.textContent = time.minutes.toString().padStart(2, '0');
    refs.seconds.textContent = time.seconds.toString().padStart(2, '0');
    console.log(refs.seconds.textContent);

    if (diff < 1000){
     clearInterval(intervalId);
    }
  
  }, 1000); 
});

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

