const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;
const DEFAULT_DELAY = 3000;

function appendPX(num) {
  return `${num}px`;
}

class Carousel {
  constructor(containerId, options) {
    this.container = document.getElementById(containerId);
    this.imageWrapper = document.querySelector('.carousel-image-wrapper');
    this.images = this.imageWrapper.children;
    this.currentIndex = 0;
    this.indicators = [];

    this.options = options || {};

    this.width = this.options.width || DEFAULT_WIDTH;
    this.height = this.options.height || DEFAULT_HEIGHT;
    this.delay = this.options.delay || DEFAULT_DELAY;

    this.init();
  }

  init() {
    this.container.style.width = appendPX(this.width);
    this.container.style.height = appendPX(this.height);

    this.imageWrapper.style.width = appendPX(this.images.length * this.width);

    for (let image of this.images) {
      image.style.width = appendPX(this.width);
      image.style.height = appendPX(this.height);
    }

    this.addArrowButtons();
    this.addIndicators();
    this.animate();
  }

  addArrowButtons() {
    let leftArrow = document.createElement('button'),
      rightArrow = document.createElement('button');
    leftArrow.className = 'arrow left';
    rightArrow.className = 'arrow right';
    leftArrow.innerHTML = '<-';
    rightArrow.innerHTML = '->';
    this.container.appendChild(leftArrow);
    this.container.appendChild(rightArrow);
    leftArrow.addEventListener('click', () => {
      if (this.currentIndex - 1 < 0) {
        this.moveTo(this.images.length - 1);
      } else {
        this.moveTo(this.currentIndex - 1);
      }
    });
    rightArrow.addEventListener('click', () => {
      if (this.currentIndex + 1 > this.images.length - 1) {
        this.moveTo(0);
      } else {
        this.moveTo(this.currentIndex + 1);
      }
    });
  }

  addIndicators() {
    this.indicators = document.createElement('div');
    this.indicators.classList.add('indicators');

    for (let i = 0; i < this.images.length; i++) {
      let indicator = document.createElement('span');
      indicator.classList.add('indicator');
      indicator.addEventListener('click', () => {
        this.moveTo(i);
      });
      this.indicators.appendChild(indicator);
    }

    this.indicators.children[0].classList.add('active');
    this.container.appendChild(this.indicators);
  }

  moveTo(index) {
    let start = this.currentIndex * this.width;
    let end = index * this.width;
    let distance = end - start;
    let speed = 10;
    let progress = 0;

    clearInterval(this.slider);
    clearInterval(this.move);

    this.move = setInterval(() => {
      this.imageWrapper.style.marginLeft = appendPX(-(start + distance * progress));
      progress += speed;
      if (progress >= 1) {
        this.imageWrapper.style.marginLeft = appendPX(-end);
        clearInterval(this.move);
        this.animate();
      }
    }, speed);

    this.indicators.children[this.currentIndex].classList.remove('active');
    this.currentIndex = index;
    this.indicators.children[index].classList.add('active');
  }

  animate() {
    this.slider = setInterval(() => {
      if (this.currentIndex + 1 > this.images.length - 1) {
        this.moveTo(0);
      } else {
        this.moveTo(this.currentIndex + 1);
      }
    }, this.delay);
  }
}
