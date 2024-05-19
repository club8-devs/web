export default function getWalletData() {
  const inputWallet = document.getElementById('wallet');
  const button = document.getElementById('wallet-button');
  const loadingState = '_loading';
  const disabledState = '_disabled';
  const body = document.getElementsByTagName('body')[0];

  button.addEventListener('click', () => {

  const walletId = inputWallet.value.replace(/\s/g, '');
  const url = `https://signal.wake.tg/wallet/${walletId}`;

    console.log('url', url);
    console.log('Clicked! ');
    console.log(walletId);
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

      
    })
    .catch(error => {
      body.classList.remove(loadingState);
      button.classList.remove(disabledState);
      button.classList.remove(loadingState);
      button.removeAttribute('disabled');

      if (error.message.includes('404')) {
        console.error('Данные не найдены');
        // Дополнительные действия при ошибке 404
      } else {
        console.error('Произошла ошибка:', error);
      }
    });
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

    body.classList.add(`_retro-level-${data.data.reward.level}`);
    body.classList.add(`_retro-${data.data.reward.type}`);
    body.classList.add(`_retro-hold-${data.data.reward.points.hold}`);
    body.classList.add(`_retro-donate-${data.data.reward.points.donate}`);

    if (data.data.raffle) {
      body.classList.add('_retro-hold-raffle');
    }

    console.log('_retro-level-', data.data.reward.level);
    console.log('_retro-', data.data.reward.type);
    console.log('_retro-hold-raffle', data.data.raffle);
    console.log('_retro-hold-', data.data.reward.points.hold);
    console.log('_retro-donate-', data.data.reward.points.donate);
  }
}