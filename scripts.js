let currentSlide = 0;
const slides = document.querySelectorAll('.slider-image');
const totalSlides = slides.length;
const indicators = document.querySelectorAll('.indicator');
let autoScrollInterval;
let isPaused = false;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === index) {
            indicator.classList.add('active');
        }
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    showSlide(currentSlide);
    if (!isPaused) {
        stopAutoScroll();
    }
}

function startAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 3000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    if (!isPaused) {
        setTimeout(() => {
            startAutoScroll();
        }, 5000);
    }
}

function togglePause() {
    isPaused = !isPaused;
    const pauseButton = document.querySelector('.slider-button-pause');
    if (isPaused) {
        clearInterval(autoScrollInterval);
        pauseButton.textContent = 'Play';
    } else {
        startAutoScroll();
        pauseButton.textContent = 'Pause';
    }
}

document.querySelector('.slider-button-next').addEventListener('click', () => changeSlide(1));
document.querySelector('.slider-button-prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.slider-button-pause').addEventListener('click', togglePause);

indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        currentSlide = i;
        showSlide(currentSlide);
        if (!isPaused) {
            stopAutoScroll();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        changeSlide(1);
    } else if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    }
});

document.querySelector('.slider-box').addEventListener('touchstart', handleTouchStart, false);
document.querySelector('.slider-box').addEventListener('touchmove', handleTouchMove, false);

let x1 = null;
function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    x1 = firstTouch.clientX;
}
function handleTouchMove(evt) {
    if (!x1) {
        return;
    }
    let x2 = evt.touches[0].clientX;
    let xDiff = x2 - x1;
    if (xDiff > 0) {
        changeSlide(-1);
    } else {
        changeSlide(1);
    }
    x1 = null;
}

showSlide(currentSlide);
startAutoScroll();
