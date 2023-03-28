class Character extends MovableObject {
  height = 342;
  width = 130;
  y = 0; // 82
  energy = 100;
  speed = 10;
  immortalTime = 1;
  hurt_sound = new Audio('audio/hit.mp3');
  jump_sound = new Audio('audio/jump.mp3');
  gameOver_sound = new Audio('audio/gameOver.mp3');
  walkink_sound = new Audio('audio/running.mp3'); // pentru muzica
  world;
  offset = {
    top: 140,
    left: 10,
    right: 28,
    bottom: 13,
  };

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];
  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Runs all animations of the character
   */
  animate() {
    setInterval(() => this.moveCharacter(), 1000 / 60);
    setInterval(() => this.playCharacterFirst(), 50);
    setInterval(() => this.playCharacterSecond(), 200);
  }

  /**
   * Moves the character when keys are pressed
   */
  moveCharacter() {
    this.walkink_sound.pause();
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) {
      this.jump();
      this.jump_sound.play();
    }
    world.camera_x = -this.x + 100;
  }

  canMoveRight() {
    return keyboard.RIGHT && this.x < world.level.level_end_x && !this.isDead();
  }

  /**
   * character is moving right
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    this.walkink_sound.play();
  }

  canMoveLeft() {
    return keyboard.LEFT && this.x > 0 && !this.isDead();
  }

  /**
   * character is moving left
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    this.walkink_sound.play();
  }

  canJump() {
    return keyboard.SPACE && !this.isAboveGround() && !this.isDead();
  }

  /**
   * Animating the movements of the character
   */
  playCharacterFirst() {
    if (this.isHurt(this.immortalTime)) {
      this.playAnimation(this.IMAGES_HURT);
      this.hurt_sound.play();
    } else if (
      (keyboard.LEFT || keyboard.RIGHT) &&
      !this.isAboveGround() &&
      !this.isDead()
    ) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  playCharacterSecond() {
    if (this.isDead()) this.playIsDead();
    else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
    else if (!this.isAboveGround()) this.playAnimation(this.IMAGES_IDLE);
  }

  playIsDead() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      world.toggleScreen('youLost', true);
    }, 2000);
    world.atackEndBoss_sound.pause();
    world.start_music.pause();
    this.gameOver_sound.play();
  }

  jump() {
    this.speedY = 25;
  }
}
