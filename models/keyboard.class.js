class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  ATTACK = false;

  constructor() {
    this.bindKeyPressEvents();
    this.bindBtnPressEvents();
  }

  bindKeyPressEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode == 39) {
        keyboard.RIGHT = true;
      }
      if (e.keyCode == 37) {
        keyboard.LEFT = true;
      }
      if (e.keyCode == 38) {
        keyboard.UP = true;
      }
      if (e.keyCode == 40) {
        keyboard.DOWN = true;
      }
      if (e.keyCode == 32) {
        keyboard.SPACE = true;
      }
      if (e.keyCode == 67) {
        keyboard.ATTACK = true;
      }
      // console.log(e);
    });

    window.addEventListener('keyup', (e) => {
      if (e.keyCode == 39) {
        keyboard.RIGHT = false;
      }
      if (e.keyCode == 37) {
        keyboard.LEFT = false;
      }
      if (e.keyCode == 38) {
        keyboard.UP = false;
      }
      if (e.keyCode == 40) {
        keyboard.DOWN = false;
      }
      if (e.keyCode == 32) {
        keyboard.SPACE = false;
      }
      if (e.keyCode == 67) {
        keyboard.ATTACK = false;
      }
    });
  }

  bindBtnPressEvents() {
    setTimeout(() => {
      document
        .getElementById('btnMobileLeft')
        .addEventListener('touchstart', (event) => {
          event.preventDefault();
          this.LEFT = true;
        });

      document
        .getElementById('btnMobileLeft')
        .addEventListener('touchend', (event) => {
          event.preventDefault();
          this.LEFT = false;
        });

      document
        .getElementById('btnMobileRight')
        .addEventListener('touchstart', (event) => {
          event.preventDefault();
          this.RIGHT = true;
        });

      document
        .getElementById('btnMobileRight')
        .addEventListener('touchend', (event) => {
          event.preventDefault();
          this.RIGHT = false;
        });

      document
        .getElementById('btnMobileJump')
        .addEventListener('touchstart', (event) => {
          event.preventDefault();
          this.SPACE = true;
        });

      document
        .getElementById('btnMobileJump')
        .addEventListener('touchend', (event) => {
          event.preventDefault();
          this.SPACE = false;
        });

      document
        .getElementById('btnMobileThrow')
        .addEventListener('touchstart', (event) => {
          event.preventDefault();
          this.ATTACK = true;
        });

      document
        .getElementById('btnMobileThrow')
        .addEventListener('touchend', (event) => {
          event.preventDefault();
          this.ATTACK = false;
        });
    }, 500);
  }
}
