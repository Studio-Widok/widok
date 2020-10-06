const $ = require('cash-dom');
const throttle = require('widok-throttle');

const bodyElement = $('body');
let isPageScrolled = false;
const widok = {
  h: 0,
  w: 0,
  s: 0,
  em: 0,
  sizeCheck: () => {
    widok.h = $(window).height();
    widok.w = $(window).width();
    widok.em = parseFloat($('body').css('font-size'));
    window.dispatchEvent(new CustomEvent('layoutChange'));
    widok.scrollCheck();
    window.dispatchEvent(new CustomEvent('afterLayoutChange'));
  },
  scrollCheck: () => {
    widok.s = window.scrollY;
    if (widok.s > 10) {
      if (!isPageScrolled) {
        bodyElement.addClass('scrolled');
        isPageScrolled = true;
      }
    } else {
      if (isPageScrolled) {
        bodyElement.removeClass('scrolled');
        isPageScrolled = false;
      }
    }
  },
};

$(window).on({
  resize: throttle(100, widok.sizeCheck),
  load: widok.sizeCheck,
  scroll: widok.scrollCheck,
});

$(document).on('ready', widok.sizeCheck);
$(document).on('ready', () => {
  console.log('ready');
});

if (typeof module !== 'undefined') module.exports = widok;
