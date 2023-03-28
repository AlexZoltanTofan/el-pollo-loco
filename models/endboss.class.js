class Endboss extends MovableObject {
  width = 300;
  height = 400;
  y = 50;
  x = 2000;
  hadFirstContact = false; /// trebuie false
  speed = 40;
  immortalTime = 1;
  isAttacking = false;
  energy = 100;
  win_sound = new Audio('audio/win.mp3');
  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];
  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];
  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];
  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];
  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  offset = {
    top: 60,
    left: 10,
    right: 10,
    bottom: 10,
  };

  constructor() {
    super();
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveEndBoss();
    }, 300);

    setInterval(() => {
      if (this.hadFirstContact && !this.otherDirection && !this.isDead()) {
        this.moveLeft();
      }
    }, 250);

    setInterval(() => {
      if (this.otherDirection && !this.isDead()) {
        this.moveRight();
      }
    }, 250);
  }

  moveEndBoss() {
    if (this.isDead()) this.playIsDead();
    else if (this.isAlive()) this.playAnimation(this.IMAGES_WALKING);
    else if (this.isAttacking && world.character.energy > 0)
      this.playAnimation(this.IMAGES_ATTACK);
    else if (this.isHurt(this.immortalTime)) {
      this.playAnimation(this.IMAGES_HURT);
      this.speed -= 2;
    }
  }

  playIsDead() {
    this.playAnimation(this.IMAGES_DEAD);
    world.atackEndBoss_sound.pause();
    setTimeout(() => {
      world.toggleScreen('youWin', true);
    }, 1500);
    this.win_sound.play();
  }

  isAlive() {
    return (
      !this.isHurt(this.immortalTime) &&
      !this.isAttacking &&
      !this.isDead() &&
      this.hadFirstContact
    );
  }
}
