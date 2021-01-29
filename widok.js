import throttle from 'widok-throttle';

const widok = {
  isPageScrolled: false,
  sizeCheck: function () {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight / 100}px`
    );
    window.dispatchEvent(new CustomEvent('layoutChange'));
    widok.scrollCheck();
    window.dispatchEvent(new CustomEvent('afterLayoutChange'));
  },
  scrollCheck: function () {
    if (window.scrollY > 10) {
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
