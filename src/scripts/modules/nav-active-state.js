export default function setNavActiveState() {
  const elements = document.querySelectorAll('[data-nav-section]');
  const mainNavElements = document.querySelectorAll('[data-main-nav-item]');
  const activeState = '_active';
  const isHome = document.getElementsByTagName('body')[0].classList.contains('_home');

  if(!elements || !isHome) {
    return;
  }

  const options = {
    threshold: [0],
    rootMargin: '-50%'
  };

  let observer = new IntersectionObserver(onEntry, options);

  for (let elm of elements) {
    observer.observe(elm);
  }

  function onEntry(entry) {
    entry.forEach((change) => {

      if(change.isIntersecting && change.target.id !== 'introduce') {
        mainNavElements.forEach((item)=>{
          item.classList.remove(activeState);
        });
        document.querySelector(`[data-main-nav-item=${change.target.id}]`).classList.add(activeState);
      } else if (change.isIntersecting && change.target.id === 'introduce') {
        mainNavElements.forEach((item)=>{
          item.classList.remove(activeState);
        });
        document.querySelector(`[data-main-nav-item="introduce"]`).classList.add(activeState);
      }

    });
  }
}