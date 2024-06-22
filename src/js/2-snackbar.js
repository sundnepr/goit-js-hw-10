import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const refs = {
    form: document.querySelector('.form'),
    input: document.querySelector('input[name ="delay"]'),
  
    button: document.querySelector('button[type ="submit"]'),
  };
  
  refs.form.addEventListener('submit', e => {
    e.preventDefault();
    const delay = refs.input.value.trim();
  
    const stateInput = document.querySelector('input[type = "radio"]:checked');
  
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (stateInput.value === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  
    promise.then(onFulfilled).catch(onRejected);
    function onFulfilled() {
      iziToast.show({
        title: 'OK',
        titleColor: '#fff',
        titleSize: '16px',
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        iconColor: '#fff',
        progressBarColor: '#326101',
        position: 'topRight',
      });
    }
    function onRejected() {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#fff',
        titleSize: '16px',
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        iconColor: '#fff',
        progressBarColor: '#b51b1b',
        position: 'topRight',
      });
    }
  });
