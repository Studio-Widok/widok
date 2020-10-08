const $ = require('cash-dom');
const throttle = require('widok-throttle');

const $window = $(window);
const $body = $('body');
let isPageScrolled = false;

const widok = {
  h: 0,
  w: 0,
  s: 0,
  sizeCheck: () => {
    widok.h = $window.height();
    widok.w = $window.width();
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight / 100}px`
    );
    window.dispatchEvent(new CustomEvent('layoutChange'));
    widok.scrollCheck();
    window.dispatchEvent(new CustomEvent('afterLayoutChange'));
  },
  scrollCheck: () => {
    widok.s = window.scrollY;
    if (widok.s > 10) {
      if (!isPageScrolled) {
        $body.addClass('scrolled');
        isPageScrolled = true;
      }
    } else {
      if (isPageScrolled) {
        $body.removeClass('scrolled');
        isPageScrolled = false;
      }
    }
  },
};

$window.on({
  resize: throttle(100, widok.sizeCheck),
  load: widok.sizeCheck,
  scroll: widok.scrollCheck,
});

document.addEventListener('ready', widok.sizeCheck);

if (typeof module !== 'undefined') module.exports = widok;
