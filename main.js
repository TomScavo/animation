const starts = document.getElementsByClassName('star-item');
const inputs = document.getElementsByClassName('form-control');
const lastImgBottom = document.querySelector('.sectione-img-bottom');
const randomID = document.querySelector('.random-id');
const textImgs = document.querySelector('#lastTextImg');
const lastImg = document.querySelector('#lastImg');

randomID.innerHTML = `<span>${Math.floor(Math.random() * 50) + 1001}</span>`;
console.log(textImgs);
textImgs.src = `./img/text/${Math.floor(Math.random() * 13) + 1}.png`;
const randomImgIndex = (function() {
  if (Math.random() > 0.5) {
    return 1;
  }
  return 0;
})();
lastImg.src = `./img/p5-bg${randomImgIndex}.png`;

let w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  height = Math.max(
    window.screen.height,
    w.innerHeight,
    e.clientHeight,
    g.clientHeight
  );

let bodyHeight = `${height}px`;
const body = document.querySelector('body');
body.style.height = bodyHeight;

let intervals = [];
blink(starts);
let current = 0;
function blink(starsElement, maxHeight = 80) {
  for (let i = 0; i < starsElement.length; i++) {
    let interID = setInterval(() => {
      let left = Math.floor(Math.random() * 80) + 'vw';
      const top = Math.floor(Math.random() * maxHeight) + 'vh';
      let size = (Math.random() * 0.5 + 1) * 10 + 'vw';
      if (height > 850) {
        size = (Math.random() * 0.5 + 1) * 5 + 'vw';
        left = Math.floor(Math.random() * 40 + 20) + 'vw';
      }

      delay = Math.random() * 2;
      starsElement[i].style.left = left;
      starsElement[i].style.top = top;
      starsElement[i].style.width = size;
      starsElement[i].style.animationDelay = delay + 's';
    }, Math.random() * 1000 + 2000);
    intervals.push(interID);
  }
}

class TypeWriter {
  constructor(txtElement, next, words, current, wait = 3000) {
    this.txtElement = txtElement;
    this.next = next;
    this.words = words;
    this.current = current;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    if (current === 7) return false;
    if (this.txt.length / this.words[this.current].length === 1) {
      if (current === 4) {
        if (
          inputs[0].value.trim() &&
          inputs[1].value.trim() &&
          inputs[2].value.trim()
        ) {
          this.next.classList.add('next-blink');
          this.txt = '';
          return false;
        } else {
          this.next.classList.remove('next-blink');
        }
      }
      if (current === 5) {
        setTimeout(() => {
          this.next.classList.add('next-blink');
        }, 2500);
        this.txt = '';
        return false;
      }
      if (current !== 4 && current !== 5) {
        this.next.classList.add('next-blink');
        this.txt = '';
        return false;
      }
    }
    const fullTxt = this.words[this.current];
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    if (this.current === 6) {
      if (fullTxt.length - this.txt.length < 5) {
        this.txtElement.innerHTML = `<span class="txt">${fullTxt.slice(
          0,
          fullTxt.length - 5
        )}<span class="txt-red">${this.txt.slice(
          fullTxt.length - 5,
          this.txt.length
        )}</span></span>`;
      } else {
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
      }
    } else {
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    }

    // Initial Type Speed
    let typeSpeed = 30;

    setTimeout(() => this.type(), typeSpeed);
  }
}

// var imgs = document.images,
//   len = imgs.length,
//   counter = 0;

// [].forEach.call(imgs, function(img) {
//   img.addEventListener('load', incrementCounter, false);
// });

// function incrementCounter() {
//   counter++;
//   if (counter === len) {
//     alert(123);
//   }
// }

// Init On DOM Load

// Init App
const next = document.querySelector('.text-area-next');
const textArea = document.querySelector('.text-area');
const txtElement = document.querySelector('.text');
const words = JSON.parse(txtElement.getAttribute('data-words'));
const nextButton = document.querySelector('.next-button');
const sectionDOverlay = document.querySelector('.sectiond-overlay');
const pageSection = document.getElementsByTagName('section');
const sectionDStars = document.getElementsByClassName('star-item-d');

function init() {
  // Init TypeWriter
  new TypeWriter(txtElement, next, words, current);
}

next.addEventListener('click', onNextclick);

//next button click clear txt and show next;
function onNextclick() {
  if (!intervals.length) {
    for (let i = 0; i < intervals.length; i++) {
      clearInterval(intervals[i]);
    }
    intervals = [];
  }

  //ufo anime start stop hide page
  if (current === 4) {
    for (let i = 0; i < intervals.length; i++) {
      clearInterval(intervals[i]);
    }
    const ufo = document.querySelector('.sectiond-ufo');
    const shine = document.querySelector('.ufo-shine');
    ufo.classList.add('ufo-anime');
    shine.classList.add('ufo-shine-anime');
    for (let i = 1; i < sectionDStars.length; i++) {
      sectionDStars[i].classList.remove('star-item-d-anime');
    }
    sectionDOverlay.style.display = 'block';
  } else if (current === 2) {
    nextButton.src = './img/next.png';
  } else if (current < 2) {
    pageSection[current].classList.remove('show');
    pageSection[current + 1].classList.add('show');
  }

  //if translate end hide page 2 show page 3
  if (current === 3) {
    pageSection[2].classList.remove('show');
    pageSection[3].classList.add('show');
  }

  //ufo end hide current page show get text
  if (current === 5) {
    pageSection[3].classList.remove('show');
    pageSection[4].classList.add('show');
  }

  //close text-area
  if (current === 6) {
    textArea.style.display = 'none';
    lastImgBottom.style.display = 'block';
    textImgs.style.display = 'block';
  }

  current++;

  next.classList.remove('next-blink');
  if (current === 2) {
    const sectionCStars = document.getElementsByClassName('star-item-c');
    nextButton.src = './img/next-translate.png';
    blink(sectionCStars, 35);
  }

  if (current === 4) {
    nextButton.src = './img/next-submit.png';
    blink(sectionDStars, 80);
  }
  if (current === 5) {
    nextButton.src = './img/next-get.png';
  }

  if (current === 6) {
    nextButton.src = './img/next.png';
  }

  txtElement.innerHTML = '';
  new TypeWriter(txtElement, next, words, current);
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', function() {
    if (this.value) {
      this.previousSibling.previousSibling.src = './img/p4-input-empty.png';
    } else {
      if (this.getAttribute('data-count') === '1') {
        this.previousSibling.previousSibling.src = './img/p4-input-1.png';
      }
      if (this.getAttribute('data-count') === '2') {
        this.previousSibling.previousSibling.src = './img/p4-input-2.png';
      }
      if (this.getAttribute('data-count') === '3') {
        this.previousSibling.previousSibling.src = './img/p4-input-3.png';
      }
    }
  });
}

function onImagesLoaded(event) {
  var images = document.getElementsByTagName('img');
  var loaded = images.length;
  for (var i = 0; i < images.length; i++) {
    if (images[i].complete) {
      loaded--;
    } else {
      images[i].addEventListener('load', function() {
        loaded--;
        if (loaded == 0) {
          event();
        }
      });
    }
    if (loaded == 0) {
      event();
    }
  }
}

onImagesLoaded(function() {
  setTimeout(init, 800);
});
