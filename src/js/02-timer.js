import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import "notiflix/dist/notiflix-aio-3.2.6.min.js"

const datePick = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondValue = document.querySelector('[data-seconds]');

let countdown;

const Countdown = (endDate) => {
 clearInterval(countdown);

 countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
        clearInterval(countdown);
        Notiflix.Notify.failure("Please , choose a date in the future!");
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor( (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

daysValue.textContent = addLeadingZero(days);
hoursValue.textContent = addLeadingZero(hours);
minutesValue.textContent = addLeadingZero(minutes);
secondValue.textContent = addLeadingZero(seconds);
}, 1000);
};


flatpickr(datePick, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
  
      if (selectedDate.getTime() < Date.now()) {
        Notiflix.Notify.failure("Please choose a date in the future");
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
        startBtn.addEventListener("click", () => {
        Countdown(selectedDate.getTime());
        });
      }
    },
  });


  function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
    
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  } 