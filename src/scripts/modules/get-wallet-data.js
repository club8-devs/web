export default function getWalletData() {
  const checkNode = document.querySelector('[data-retro-check]');

  if(!checkNode) return;

  const inputWallet = document.getElementById('wallet');
  const button = document.getElementById('wallet-button');
  const closeButton = document.querySelector('[data-retro-wallet-close]');
  const loadingState = '_loading';
  const disabledState = '_disabled';
  const activeState = '_active';
  const errorState = '_error';
  const body = document.getElementsByTagName('body')[0];
  const donatedNode = document.querySelector('[data-retro-donated]');
  const walletNameNode = document.querySelector('[data-retro-wallet-name]');
  
  const resultsNode = document.querySelector('[data-retro-results]');

  const goRaffleButton = document.querySelector('[data-go-raffle-button]');

  button.addEventListener('click', () => {

    const walletId = inputWallet.value.replace(/\s/g, '');
    const url = `https://checker.anon.tg/wallet/${walletId}`;

    body.classList.add(loadingState);
    button.setAttribute('disabled', true);
    button.classList.add(disabledState);
    button.classList.add(loadingState);

    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`error receiving data: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('received data:', data);
      body.classList.remove(loadingState);
      button.classList.remove(disabledState);
      button.classList.remove(loadingState);
      button.removeAttribute('disabled');

      setStatusClassnames(data);
      checkNode.classList.remove(activeState);
      resultsNode.classList.add(activeState);
      
    })
    .catch(error => {
      body.classList.remove(loadingState);
      button.classList.remove(disabledState);
      button.classList.remove(loadingState);
      button.removeAttribute('disabled');
      inputWallet.classList.add(errorState);

      if (error.message.includes('404')) {
        console.error('No data found');

      } else {
        console.error('error:', error);
      }
    });
  });

  closeButton.addEventListener('click', () => {

    inputWallet.value = '';
    setTimeout(function(){
      inputWallet.focus();
    }, 600);
    checkNode.classList.add(activeState);
    resultsNode.classList.remove(activeState);

    body.classList.remove('_raffle-countdown');
    body.classList.remove('_raffle-result');
    body.classList.add('_raffle-start');

    stopCountdown();
    
  });

  goRaffleButton.addEventListener('click', () => {

    body.classList.remove('_raffle-start');
    body.classList.add('_raffle-countdown');

    startCountdown();

    setTimeout(function(){
      body.classList.remove('_raffle-countdown');
      body.classList.add('_raffle-result');

      initConfetti();
    }, 8000);
    
  });

  function setStatusClassnames(data) {
    body.classList.remove('_retro-level-bronze');
    body.classList.remove('_retro-level-silver');
    body.classList.remove('_retro-level-gold');
    body.classList.remove('_retro-level-platinum');
    body.classList.remove('_retro-level-sapphire');
    body.classList.remove('_retro-level-emerald');
    body.classList.remove('_retro-level-ruby');
    body.classList.remove('_retro-level-diamond');

    body.classList.remove('_retro-raffle-level-bronze');
    body.classList.remove('_retro-raffle-level-silver');
    body.classList.remove('_retro-raffle-level-gold');
    body.classList.remove('_retro-raffle-level-platinum');
    body.classList.remove('_retro-raffle-level-sapphire');
    body.classList.remove('_retro-raffle-level-emerald');
    body.classList.remove('_retro-raffle-level-ruby');
    body.classList.remove('_retro-raffle-level-diamond');

    body.classList.remove('_retro-hold-raffle');

    body.classList.remove('_retro-pass');
    body.classList.remove('_retro-box');

    body.classList.remove('_retro-hold-0');
    body.classList.remove('_retro-hold-1');
    body.classList.remove('_retro-hold-2');

    body.classList.remove('_retro-donate-1');
    body.classList.remove('_retro-donate-2');
    body.classList.remove('_retro-donate-3');
    body.classList.remove('_retro-donate-4');
    body.classList.remove('_retro-donate-5');
    body.classList.remove('_retro-donate-6');
    body.classList.remove('_retro-donate-7');
    body.classList.remove('_retro-donate-8');

    body.classList.remove('_retro-not-eligible');
    body.classList.remove('_retro-raffle-winner');
    body.classList.remove('_retro-raffle-loser');

    if (data.data.eligible) {
      body.classList.add(`_retro-level-${data.data.reward.level}`);
      body.classList.add(`_retro-${data.data.reward.type}`);
      body.classList.add(`_retro-hold-${data.data.reward.points.hold}`);
      body.classList.add(`_retro-donate-${data.data.reward.points.donate}`);
  
      if (data.data.raffle) {
        body.classList.add('_retro-hold-raffle');
      }
  
      donatedNode.textContent = data.data.reward.donated;
      walletNameNode.textContent = data.data.wallet_short;

    } else {

      body.classList.add('_retro-not-eligible');
      walletNameNode.textContent = data.data.wallet_short;
    }


    if (data.data.raffle_winner) {
      body.classList.add('_retro-raffle-winner');
      body.classList.add(`_retro-raffle-level-${data.data.raffle_reward_level}`);
    } else {
      body.classList.add('_retro-raffle-loser');
    }

  }

  let countdownInterval; 
  function startCountdown() {
    const countdownNumberEl = document.querySelector('.countdown_active');
    let countdown = 8;
    countdownInterval = setInterval(function() {
      countdown = (--countdown <= 0) ? 8 : countdown;
      countdownNumberEl.textContent = countdown;
  
      if (countdown === 0) {
        clearInterval(countdownInterval); // Остановка интервала
      }
    }, 1000);
  
    countdownNumberEl.textContent = countdown;
  }

  function stopCountdown() {
    clearInterval(countdownInterval);
  }


// Confetti logic -- START --
let canvas = document.getElementById("confetti");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cx = ctx.canvas.width/2;
let cy = ctx.canvas.height/2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
  { front : 'red', back: 'darkred'},
  { front : 'green', back: 'darkgreen'},
  { front : 'blue', back: 'darkblue'},
  { front : 'yellow', back: 'darkyellow'},
  { front : 'orange', back: 'darkorange'},
  { front : 'pink', back: 'darkpink'},
  { front : 'purple', back: 'darkpurple'},
  { front : 'turquoise', back: 'darkturquoise'},
];

//-----------Functions--------------
let resizeCanvas = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	cx = ctx.canvas.width/2;
	cy = ctx.canvas.height/2;
}

let randomRange = (min, max) => Math.random() * (max - min) + min

let initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color      : colors[Math.floor(randomRange(0, colors.length))],
      dimensions : {
        x: randomRange(10, 20),
        y: randomRange(10, 30),
      },
      position   : {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1,
      },
      rotation   : randomRange(0, 2 * Math.PI),
      scale      : {
        x: 1,
        y: 1,
      },
      velocity   : {
        x: randomRange(-25, 25),
        y: randomRange(0, -50),
      },
    });
  }
}

//---------Render-----------
let render = () => {  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  confetti.forEach((confetto, index) => {
    let width = (confetto.dimensions.x * confetto.scale.x);
    let height = (confetto.dimensions.y * confetto.scale.y);
    
    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);
    
    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
    
    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;
    
    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetto
    ctx.fillRect(-width / 2, -height / 2, width, height);
    
    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  //if (confetti.length <= 10) initConfetti();

  window.requestAnimationFrame(render);
}

//---------Execution--------
render();

//----------Resize----------
window.addEventListener('resize', function () {
  resizeCanvas();
});

//------------Click------------


// Confetti logic -- END --


}



