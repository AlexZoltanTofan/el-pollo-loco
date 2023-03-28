let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

/**
 * loading the canvas on page load
 */
function startGame() {
  clearAllIntervals();
  displayElements();
  initLevel1();
  canvas = document.getElementById('canvas');
  world = new World(canvas);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function displayElements() {
  document.getElementById('youWin').style = 'display: none';
  document.getElementById('youLost').style = 'display: none';
  document.getElementById('showIconAudio').src = 'icons/audioOnIcon.png';
}

function setStopableInterval(fn, time) {
  let idIntervall = setInterval(fn, time);
  intervalIds.push(idIntervall);
}

function showControllMenu() {
  document.getElementById('cardControlls').classList.remove('d-none');
}

function closeControllMenu() {
  document.getElementById('cardControlls').classList.add('d-none');
}

function showFullScreen() {
  let fullscreean = document.getElementById('fullscreean');
  document.getElementById('canvas').style.cssText =
    'width: 100%; height: 100%;';
  enterFullscreen(fullscreean);
  exitFullscreen();
  showIcon();
}

function showIcon() {
  const image = document.getElementById('showIconFullscreen');
  if (image.getAttribute('src') == 'icons/enterFullscreenIcon.png') {
    image.setAttribute('src', 'icons/exitFullscreenIcon.png');
  } else {
    image.setAttribute('src', 'icons/enterFullscreenIcon.png');
  }
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
