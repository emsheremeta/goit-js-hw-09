// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
function createPromise(position, delay) {
  let totalFuckingDelay = (Number(refs.firstDelay.value) + Number(position * delay));
  console.log('inside promise ' + totalFuckingDelay);
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, totalFuckingDelay});
      } else {
        reject({position, totalFuckingDelay});
      }
    }, totalFuckingDelay);
  });
}

const refs = {
  submitBtn : document.querySelector('button'),
  firstDelay: document.querySelector('input[name="delay"]') ,
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]')
}

const onClick = (event) => {
  event.preventDefault();
  for(let i = 0; i < refs.amount.value; i++) {
    createPromise(i, refs.delayStep.value)
    .then(({ position, totalFuckingDelay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${totalFuckingDelay}ms`);
    })
    .catch(({ position, totalFuckingDelay }) => {
      console.log(`❌ Rejected promise ${position} in ${totalFuckingDelay}ms`);
    });
    
  }
  
};

refs.submitBtn.addEventListener('click', onClick);

