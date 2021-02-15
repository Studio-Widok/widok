import throttle from 'widok-throttle';

const widok = {
  isPageScrolled: false,
  s: 0,
  w: 0,
  h: 0,
  sizeCheck: function () {
    widok.h = window.innerHeight;
    widok.w = window.innerWidth;
    document.documentElement.style.setProperty('--vh', `${widok.h / 100}px`);
    window.dispatchEvent(new CustomEvent('layoutChange'));
    widok.scrollCheck();
    window.dispatchEvent(new CustomEvent('afterLayoutChange'));
  },
  scrollCheck: function () {
    widok.s = window.scrollY;
    if (widok.s > 10) {
      if (!widok.isPageScrolled) {
        document.body.classList.add('scrolled');
        widok.isPageScrolled = true;
      }
    } else {
      if (widok.isPageScrolled) {
        document.body.classList.remove('scrolled');
        widok.isPageScrolled = false;
      }
    }
  },
};

window.addEventListener('resize', throttle(100, widok.sizeCheck));
window.addEventListener('load', widok.sizeCheck);
window.addEventListener('scroll', widok.scrollCheck);
document.addEventListener('ready', widok.sizeCheck);

export default widok;
