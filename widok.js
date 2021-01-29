import throttle from 'widok-throttle';

const widok = {
  isPageScrolled: false,
  s: 0,
  w: 0,
  h: 0,
  sizeCheck: function () {
    this.h = window.innerHeight;
    this.w = window.innerWidth;
    document.documentElement.style.setProperty('--vh', `${this.h / 100}px`);
    window.dispatchEvent(new CustomEvent('layoutChange'));
    widok.scrollCheck();
    window.dispatchEvent(new CustomEvent('afterLayoutChange'));
  },
  scrollCheck: function () {
    this.s = window.scrollY;
    if (this.s > 10) {
      if (!this.isPageScrolled) {
        document.body.classList.add('scrolled');
        this.isPageScrolled = true;
      }
    } else {
      if (this.isPageScrolled) {
        document.body.classList.remove('scrolled');
        this.isPageScrolled = false;
      }
    }
  },
};

window.addEventListener('resize', throttle(100, widok.sizeCheck));
window.addEventListener('load', widok.sizeCheck);
window.addEventListener('scroll', widok.scrollCheck);
document.addEventListener('ready', widok.sizeCheck);

export default widok;
