// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
import Notiflix from 'notiflix';


const refs = {
  submitBtn : document.querySelector('button'),
  firstDelay: document.querySelector('input[name="delay"]') ,
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]')
}

function createPromise(position, delay) {
  let totalDelay = (Number(refs.firstDelay.value) + Number(position * delay));
  // console.log('promise ' + totalDelay);
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, totalDelay});
      } else {
        reject({position, totalDelay});
      }
    }, totalDelay);
  });
}


const onClick = (event) => {
  event.preventDefault();
  for(let i = 0; i < refs.amount.value; i++) {
    createPromise(i, refs.delayStep.value)
    .then(({ position, totalDelay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${totalDelay}ms`);
    })
    .catch(({ position, totalDelay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${totalDelay}ms`);
    });
    
  }
  
};

refs.submitBtn.addEventListener('click', onClick);

