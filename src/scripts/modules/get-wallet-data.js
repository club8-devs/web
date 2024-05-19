export default function getWalletData() {
  const inputWallet = document.getElementById('wallet');

  if(!inputWallet) return;

  const button = document.getElementById('wallet-button');
  const closeButton = document.querySelector('[data-retro-wallet-close]');
  const loadingState = '_loading';
  const disabledState = '_disabled';
  const activeState = '_active';
  const errorState = '_error';
  const body = document.getElementsByTagName('body')[0];
  const donatedNode = document.querySelector('[data-retro-donated]');
  const walletNameNode = document.querySelector('[data-retro-wallet-name]');
  const checkNode = document.querySelector('[data-retro-check]');
  const resultsNode = document.querySelector('[data-retro-results]');

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
        throw new Error(`Ошибка при получении данных: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Полученные данные:', data);
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
        console.error('Данные не найдены');

      } else {
        console.error('Произошла ошибка:', error);
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

  }
}
