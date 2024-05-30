export default function setCountdown() {

  let timeControl = document.querySelector('#timeControl');
  if (!timeControl) return
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;
  
  let utcTime = new Date('May 30 2024 20:08:00 UTC');
  let countDown = utcTime.getTime();
  
  const doCountdown = () => {
  
      let nowDate = new Date().getTime();
      let distance = countDown - nowDate;
      
      document.getElementById('days').innerText = Math.floor(distance / (day));
      document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour));
      document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute));
      document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

      if (distance < 0) {
          clearInterval(countdownTimer);
          timeControl.innerHTML = '<a href="/box" class="btn btn--wide">See my box</a>'
      }
  }
  
  let countdownTimer = setInterval(doCountdown, 1000);
}
