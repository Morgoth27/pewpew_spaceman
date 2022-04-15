import Phaser from "phaser";
import Planck, { Circle } from "planck-js";
import { Vec2, Math,  } from "planck-js";

import "./style.css";


import ship_idle from "./ship_idle.png";
import ship_idle_left from "./ship_idle_left.png";
import ship_idle_right from "./ship_idle_right.png";

import ship_move from "./ship_move.png";
import ship_move_forward_left from "./ship_move_forward_left.png";
import ship_move_forward_right from "./ship_move_forward_right.png";

import ship_reverse from "./ship_reverse.png";
import ship_reverse_left from "./ship_reverse_left.png";
import ship_reverse_right from "./ship_reverse_right.png";
import ship_boost_reverse from "./ship_boost_reverse.png";

import ship_boost from "./ship_boost.png";
import ship_boost_forward_left from "./ship_boost_forward_left.png";
import ship_boost_forward_right from "./ship_boost_forward_right.png";



import turretSprite from "./turret.png";
import turret_fire from "./turret_fire.png";
import turret_static from "./turret.png";

import bulletSprite from "./bullet.png";

import spaceBG from "./Space.PNG"
import stars from "./stars.PNG"


let keyA;
let keyS;
let keyD;
let keyW;

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "black",
  parent: "phaser-example"
};

// var idle = true;


const width = window.innerWidth;
const height = window.innerHeight;


var turret;




var BULLET = 4;
var FIRE_RELOAD_TIME = 100;
var BULLET_LIFE_TIME = 1000;

var SHIP_SIZE = .3;

var ASTEROID = 14;

var allowFireTime = 0;

var globalTime = 0;

var asteroidBodies = [];
var bulletBodies = [];

var mouseX = 0;
var mouseY = 0;


class Main extends Phaser.Scene {
  preload() {
    // this.load.image('space', './Space.png');
    // this.load.image('stars', './stars.png');


    this.load.spritesheet("shipIDLE", ship_idle, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("shipIDLELEFT", ship_idle_left, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("shipIDLERIGHT", ship_idle_right, {
      frameWidth: 256,
      frameHeight: 256
    });

    this.load.spritesheet("shipMOVE", ship_move, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("shipMOVEFORWARDLEFT", ship_move_forward_left, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("shipMOVEFORWARDRIGHT", ship_move_forward_right, {
      frameWidth: 256,
      frameHeight: 256
    });

    this.load.spritesheet("shipREVERSE", ship_reverse, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("shipREVERSELEFT", ship_reverse_left, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("shipREVERSERIGHT", ship_reverse_right, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("shipBOOSTREVERSE", ship_boost_reverse, {
      frameWidth: 256,
      frameHeight: 256
    });

    this.load.spritesheet("shipBOOST", ship_boost, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("shipBOOSTFORWARDLEFT", ship_boost_forward_left, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("shipBOOSTFORWARDRIGHT", ship_boost_forward_right, {
      frameWidth: 256,
      frameHeight: 256
    });
    

    this.load.spritesheet("turretFIRE", turret_fire, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("turretSTATIC", turret_static, {
      frameWidth: 256,
      frameHeight: 256
    });

    this.load.spritesheet("bulletSHOT", bulletSprite, {
      frameWidth: 256,
      frameHeight: 256
    });



    this.load.spritesheet('SPACE', spaceBG, {
      frameWidth: 1800,
      frameHeight: 1400
    });
    this.load.spritesheet('stars', stars, {
      frameWidth: 5800,
      frameHeight: 5400
    });




  }
  create() {

  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


    this.worldScale = 30;

    let gravity = Planck.Vec2(0, 0);
    var pl = Planck, Vec2 = pl.Vec2;
    this.world = pl.World();

    // // createBox is a method I wrote to create a box, see how it works at line 55
    // the rest of the script just creates a random box each 500ms, then restarts after 100 iterations
    this.tick = 0;
    // this.time.addEvent({
    //   delay: 500,
    //   callbackScope: this,
    //   callback: function() {
    //     this.createBox(
    //       Phaser.Math.Between(100, config.width - 100),
    //       100,
    //       Phaser.Math.Between(20, 80),
    //       Phaser.Math.Between(20, 80),
    //       true
    //     );
    //     this.tick++;
    //     if (this.tick === 20) {
      //       this.scene.restart("PlayGame");
      //     }
      //   },
      //   loop: true
      // });
      // console.log(this)
      // this.add.sprite(0, 0, "SPACE").setOrigin(0.5, 1).setDisplaySize();
      this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'SPACE').setScrollFactor(0.051);
      this.add.image(800, 50, 'stars').setScrollFactor(.095);
      // this.space = this.add.image(0, 0, "space");
      
      
      this.createBox(200, 200, 200, 200, false);
      this.player = this.add.sprite(200, 200, "shipIDLE").setOrigin(0.5, .41 );
      
      this.anims.create({
        key: "ship_idle_anim",
        frames: this.anims.generateFrameNumbers("shipIDLE"),
        frameRate: 15,
        repeat: -1,
      })
      this.anims.create({
        key: "ship_idle_left_anim",
        frames: this.anims.generateFrameNumbers("shipIDLELEFT"),
        frameRate: 15,
        repeat: -1,
      })
      this.anims.create({
        key: "ship_idle_right_anim",
        frames: this.anims.generateFrameNumbers("shipIDLERIGHT"),
        frameRate: 15,
        repeat: -1,
      })
      
      this.anims.create({
        key: "ship_move_anim",
        frames: this.anims.generateFrameNumbers("shipMOVE"),
        frameRate: 15,
        repeat: -1,
      })
      this.anims.create({
        key: "ship_move_forward_left_anim",
        frames: this.anims.generateFrameNumbers("shipMOVEFORWARDLEFT"),
        frameRate: 15,
      repeat: -1,
    })
    this.anims.create({
      key: "ship_move_forward_right_anim",
      frames: this.anims.generateFrameNumbers("shipMOVEFORWARDRIGHT"),
      frameRate: 15,
      repeat: -1,
    })
    
    this.anims.create({
      key: "ship_reverse_anim",
      frames: this.anims.generateFrameNumbers("shipREVERSE"),
      frameRate: 15,
      repeat: -1,
    })
    this.anims.create({
      key: "ship_reverse_left_anim",
      frames: this.anims.generateFrameNumbers("shipREVERSELEFT"),
      frameRate: 15,
      repeat: -1,
    })
    this.anims.create({
      key: "ship_reverse_right_anim",
      frames: this.anims.generateFrameNumbers("shipREVERSERIGHT"),
      frameRate: 15,
      repeat: -1,
    })
    this.anims.create({
      key: "ship_boost_reverse_anim",
      frames: this.anims.generateFrameNumbers("shipBOOSTREVERSE"),
      frameRate: 15,
      repeat: -1,
    })
    
    this.anims.create({
      key: "ship_boost_anim",
      frames: this.anims.generateFrameNumbers("shipBOOST"),
      frameRate: 15,
      repeat: -1,
    })
    this.anims.create({
      key: "ship_boost_forward_left_anim",
      frames: this.anims.generateFrameNumbers("shipBOOSTFORWARDLEFT"),
      frameRate: 15,
      repeat: -1,
    })
    this.anims.create({
      key: "ship_boost_forward_right_anim",
      frames: this.anims.generateFrameNumbers("shipBOOSTFORWARDRIGHT"),
      frameRate: 15,
      repeat: -1,
    })
    
    this.anims.create({
      key: "turret_fire_anim",
      frames: this.anims.generateFrameNumbers("turretFIRE"),
      frameRate: 25,
      repeat: -1,
    });
    this.anims.create({
      key: "turret_static_anim",
      frames: this.anims.generateFrameNumbers("turretSTATIC"),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "bullet_shot_anim",
      frames: this.anims.generateFrameNumbers("bulletSHOT"),
      frameRate: 10,
      repeat: -1,
    });


    this.anims.create({
      key: "space_anim",
      frames: this.anims.generateFrameNumbers("SPACE"),
      frameRate: 1,
      repeat: -1,
    })


    this.turret = this.add.sprite(0, 0, "turretFIRE").setOrigin(0.5, .63 );



    
    // this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.followOffset.set(0, 0);
    this.player.setScale(1);
    this.turret.setScale(.8);
    this.turretBody = this.world.createDynamicBody({
      position: Vec2(0, 0)
    });
    this.turretBody.createFixture(
      Planck.Circle(50, 50)
    );

      this.turretBody.setMassData({
        mass: 0,
        center: Planck.Vec2(),
        // maxTranslation: .0001,
        // I have to say I do not know the meaning of this "I", but if you set it to zero, bodies won't rotate
        I: 1
      });
      // a body can have anything in its user data, normally it's used to store its sprite
      this.turretBody.setUserData(this.turret);


    this.playerBody = this.world.createBody();
    this.playerBody.createFixture(
      Planck.Box(100 / 2 / this.worldScale , 125 / 2 / this.worldScale )
      );
      // now we place the body in the world
      this.playerBody.setPosition(
        Planck.Vec2(0, 0)
        );
        this.playerBody.setDynamic({
        });
        this.playerBody.setMassData({
          mass: 5,
          friction : 1,
          center: Planck.Vec2(),
          // maxTranslation: .0001,
          // I have to say I do not know the meaning of this "I", but if you set it to zero, bodies won't rotate
          I: 1
        });
        // this.playerBody.
        this.playerBody.setLinearDamping(.015);
        this.playerBody.setAngularDamping(0.015);
        // a body can have anything in its user data, normally it's used to store its sprite
        this.playerBody.setUserData(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();




        let joint = this.world.createJoint(Planck.RevoluteJoint({
          bodyA: this.playerBody,
          bodyB: this.turretBody,
          anchorPoint: this.playerBody.getLocalCenter(),
        }));


  }

  createBox(posX, posY, width, height, isDynamic) {
    let box = this.world.createBody();
    if (isDynamic) {
      // Box2D bodies born as static bodies, but we can make them dynamic
    }
    box.setDynamic();
    // a body can have one or more fixtures. This is how we create a box fixture inside a body
    box.createFixture(
      Planck.Box(width / 2 / this.worldScale, height / 2 / this.worldScale)
    );
    // now we place the body in the world
    box.setPosition(
      Planck.Vec2(width / 2, height / 2)
    );
    // time to set mass information
    box.setMassData({
      mass: 50,
      center: Planck.Vec2(),
      // I have to say I do not know the meaning of this "I", but if you set it to zero, bodies won't rotate
      I: 1
    });
    // now we create a graphics object representing the body
    var color = new Phaser.Display.Color();
    color.random();
    color.brighten(50).saturate(100);
    let userData = this.add.graphics();
    userData.fillStyle(color.color, 1);
    userData.fillRect(-width / 2, -height / 2, width, height);
    // a body can have anything in its user data, normally it's used to store its sprite
    box.setUserData(userData);



   
    
    this.addEvents();
  }
  
  addEvents() {
    // const { cursors } = this;
    // this.input.on('pointerdown', () => {
    //   // console.log("Shooting")
    //   this.turret.play('turret_fire_anim', true);

    //   var magnitude = 5, angle = this.turretBody.getAngle() + Math.PI / 2;
    //   console.log(this.playerBody.getWorldCenter())
    //   // Create a bullet body
    //   bulletBody = this.add.sprite(0, 0, "bulletSHOT");
    //   bulletBody.setScale(.65)
    //   bulletBody.play('bullet_shot_anim', true);
    //   var bulletBody = this.world.createDynamicBody({
    //     mass : 0.05,
    //     position: this.turretBody.getLocalVector(Vec2(0, SHIP_SIZE)),
        
    //     linearVelocity: this.turretBody.getWorldVector(Vec2(0, magnitude)),
    //     bullet: true
    //   });
    //   bulletBody.createFixture(new Planck.Circle(0.05), {
    //     filterCategoryBits: BULLET,
    //     filterMaskBits: ASTEROID
    //   })
    //   bulletBody.setUserData(bulletBody);
    //   bulletBodies.push(bulletBody);
      
    //   // Keep track of the last time we shot
    //   allowFireTime = globalTime + FIRE_RELOAD_TIME;
      
    //   // Remember when we should delete this bullet
    //   bulletBody.dieTime = globalTime + BULLET_LIFE_TIME;
    
      
      
    // })
    // for (var i = 0; i !== bulletBodies.length; i++) {
    //   var bulletBody = bulletBodies[i];

    //   // If the bullet is old, delete it
    //   if (bulletBody.dieTime <= globalTime) {
    //     bulletBodies.splice(i, 1);
    //     world.destroyBody(bulletBody);
    //     i--;
    //     continue;
    //   }
    //   // wrap(bulletBody);
    // }
  }

  update(dt) {
    // advance the simulation by 1/20 seconds
    globalTime += dt;
    this.world.step(1 / 64);
    // globalTime += dt;
    // crearForces  method should be added at the end on each step
    this.world.clearForces();



    const player = this.playerBody;
    const turret = this.turretBody;
    const { cursors } = this;
    // console.log(this)
    const v = 0.05;
    let vx = 0;
    let vy = 0;

    var idle;

    if (!cursors.shift.isDown && !keyW.isDown && !keyS.isDown && !keyA.isDown && !keyD.isDown) {
      this.player.play('ship_idle_anim', true);
      var idle = true;
    }

// console.log(dt)


    if (cursors.space.isDown && globalTime > allowFireTime) {
      console.log(this.turretBody.getAngle(x, y))
      // console.log("Shooting")
      this.turret.play('turret_fire_anim', true);

      var magnitude = 5, angle = this.turretBody.getAngle() + Math.PI / 2;
      console.log(this.playerBody.getWorldCenter())
      // Create a bullet body
      this.bulletBody = this.add.sprite(0, 5, "bulletSHOT"); 
      this.bulletBody.setScale(.65)
      this.bulletBody.play('bullet_shot_anim', true);
      this.bulletBody = this.world.createDynamicBody({
        position: Vec2(0, 0),
        
      });
      this.bulletBody.createFixture(
        Planck.Circle(0.05), {
          filterCategoryBits: BULLET,
          filterMaskBits: ASTEROID
        });
        this.bulletBody.setMassData({
          linearVelocity: this.turretBody.getWorldVector(Vec2(0, magnitude)),
          mass: 0,
          center: Planck.Vec2(),
          bullet: true
      })
      this.bulletBody.setUserData(this.bulletBody);
      bulletBodies.push(this.bulletBody);
      
      // Keep track of the last time we shot
      allowFireTime = globalTime + FIRE_RELOAD_TIME;
      
      // Remember when we should delete this bullet
      this.bulletBody.dieTime = globalTime + BULLET_LIFE_TIME;
      
      
    } else {
        this.turret.play('turret_static_anim', true);
    }
    for (var i = 0; i !== bulletBodies.length; i++) {
      var bulletBody = bulletBodies[i];

      // If the bullet is old, delete it
      if (bulletBody.dieTime <= globalTime) {
        bulletBodies.splice(i, 1);
        this.world.destroyBody(bulletBody);
        i--;
        continue;
      }
      // wrap(bulletBody);
    }

    if (keyS.isDown && !keyW.isDown && !cursors.shift.isDown && !keyA.isDown && !keyD.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, 0.01));
      var p = player.getWorldPoint(Vec2(0.0, 0.02));
      player.applyLinearImpulse(f, p, true);

      this.player.play('ship_reverse_anim', true);

    } else if (keyS.isDown && !cursors.shift.isDown && !keyW.isDown && keyA.isDown && !keyD.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, 0.01));
      var p = player.getWorldPoint(Vec2(0.0, 0.02));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(-0.001);

      // this.player.play('ship_boost_reverse_left_anim', true);
      this.player.play('ship_reverse_left_anim', true);

    } else if (keyS.isDown && keyD.isDown && !cursors.shift.isDown && !keyW.isDown && !keyA.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, 0.01));
      var p = player.getWorldPoint(Vec2(0.0, 0.02));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(0.001);

      // this.player.play('ship_boost_reverse_right_anim', true);
      this.player.play('ship_reverse_right_anim', true);

    } else if (keyS.isDown && cursors.shift.isDown && !keyW.isDown && !keyA.isDown && !keyD.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, 0.06));
      var p = player.getWorldPoint(Vec2(0.0, 0.07));
      player.applyLinearImpulse(f, p, true);

      // this.player.play('ship_boost_reverse_anim', true);
      this.player.play('ship_reverse_anim', true);

    } else if (keyS.isDown && cursors.shift.isDown && !keyW.isDown && keyA.isDown && !keyD.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, 0.06));
      var p = player.getWorldPoint(Vec2(0.0, 0.07));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(-0.001);

      // this.player.play('ship_boost_reverse_anim', true);
      this.player.play('ship_reverse_left_anim', true);

    } else if (keyS.isDown && cursors.shift.isDown && !keyW.isDown && !keyA.isDown && keyD.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, 0.06));
      var p = player.getWorldPoint(Vec2(0.0, 0.07));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(0.001);

      // this.player.play('ship_boost_reverse_anim', true);
      this.player.play('ship_reverse_right_anim', true);

    } else if (keyW.isDown && !keyS.isDown && !cursors.shift.isDown&& !keyD.isDown && !keyA.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, -0.01));
      var p = player.getWorldPoint(Vec2(0.0, -0.02));
      player.applyLinearImpulse(f, p, true);

      this.player.play('ship_move_anim', true);

    } else if (keyW.isDown && cursors.shift.isDown && !keyS.isDown && !keyA.isDown && !keyD.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, -0.081));
      var p = player.getWorldPoint(Vec2(0.0, -0.092));
      player.applyLinearImpulse(f, p, true);

      this.player.play('ship_boost_anim', true);

    } else if (!keyW.isDown && cursors.shift.isDown && !keyS.isDown && !keyA.isDown && keyD.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, -0.081));
      var p = player.getWorldPoint(Vec2(0.0, -0.092));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(0.001);

      this.player.play('ship_boost_forward_right_anim', true);

    } else if (!keyW.isDown && cursors.shift.isDown && !keyS.isDown && keyA.isDown && !keyD.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, -0.081));
      var p = player.getWorldPoint(Vec2(0.0, -0.092));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(-0.001);

      this.player.play('ship_boost_forward_left_anim', true);

    }

    if (keyA.isDown && !keyD.isDown && !keyW.isDown && !cursors.shift.isDown && !keyS.isDown) {
      idle = false;
      player.applyAngularImpulse(-0.001);

      var f = player.getWorldVector(Vec2(0.0, -0.00001));
      var p = player.getWorldPoint(Vec2(0.0, -0.00001));
      player.applyLinearImpulse(f, p, true);

      this.player.play('ship_idle_left_anim', true);

    } else if (keyW.isDown && keyA.isDown && !keyD.isDown && !cursors.shift.isDown) {
      idle = false;
      
      player.applyAngularImpulse(-0.001);
      var f = player.getWorldVector(Vec2(0.0, -0.01));
      var p = player.getWorldPoint(Vec2(0.0, -0.02));
      player.applyLinearImpulse(f, p, true);


      this.player.play('ship_move_forward_left_anim', true);

    } else if (keyA.isDown && !keyD.isDown && keyW.isDown && cursors.shift.isDown) {
      idle = false;
      console.log("Boosting")
      player.applyAngularImpulse(-0.001);
      var f = player.getWorldVector(Vec2(0.0, -0.081));
      var p = player.getWorldPoint(Vec2(0.0, -0.092));
      player.applyLinearImpulse(f, p, true);



      this.player.play('ship_boost_forward_left_anim', true);





    } else if (keyD.isDown && !keyS.isDown && !keyA.isDown && !keyW.isDown && !cursors.shift.isDown) {
      idle = false;
      player.applyAngularImpulse(0.001);
      var f = player.getWorldVector(Vec2(0.0, -0.00001));
      var p = player.getWorldPoint(Vec2(0.0, -0.00001));
      player.applyLinearImpulse(f, p, true);

      this.player.play('ship_idle_right_anim', true);

    } else if (keyD.isDown && !keyA.isDown && !cursors.shift.isDown && keyW.isDown) {
      idle = false;
      var f = player.getWorldVector(Vec2(0.0, -0.01));
      var p = player.getWorldPoint(Vec2(0.0, -0.02));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(0.001);

      this.player.play('ship_move_forward_right_anim', true);

    }else if (keyD.isDown && !keyA.isDown && keyW.isDown && cursors.shift.isDown) {
      idle = false;
      player.applyAngularImpulse(0.001);

      var f = player.getWorldVector(Vec2(0.0, -0.041));
      var p = player.getWorldPoint(Vec2(0.0, -0.052));
      player.applyLinearImpulse(f, p, true);

      this.player.play('ship_boost_forward_right_anim', true);





    }







    this.input.on('pointermove', function (pointer) {

      mouseX = pointer.x;
      mouseY = pointer.y;



      
      
      turret.setAngle(Phaser.Math.Angle.Between(mouseX, mouseY, (x / 2), (y / 2)) - Math.PI / 2);
    });
    // console.log(player)
    var x = window.innerWidth;
    var y = window.innerHeight;
    // if (cursors.activeKeys.fire && globalTime > allowFireTime) {
    
    //   var magnitude = 5, angle = player.Getangle + Math.PI / 2;
    
    //   // Create a bullet body
    //   var bulletBody = world.createDynamicBody({
      //     // mass : 0.05,
      //     position: player.getWorldPoint(Vec2(0, SHIP_SIZE)),
      //     linearVelocity: player.getWorldVector(Vec2(0, magnitude)),
      //     bullet: true
      //   });
      //   bulletBody.createFixture(new pl.Circle(0.05), {
        //     filterCategoryBits: BULLET,
        //     filterMaskBits: ASTEROID
        //   });
        //   bulletBodies.push(bulletBody);
        
        //   // Keep track of the last time we shot
        //   allowFireTime = globalTime + FIRE_RELOAD_TIME;
        
        //   // Remember when we should delete this bullet
        //   bulletBody.dieTime = globalTime + BULLET_LIFE_TIME;
        // }
        

    // iterate through all bodies
    for (let b = this.world.getBodyList(); b; b = b.getNext()) {
      // get body position
      let bodyPosition = b.getPosition();
      // get body angle, in radians
      let bodyAngle = b.getAngle();
      // get body user data, the graphics object
      let userData = b.getUserData();
      // adjust graphic object position and rotation
      userData.x = bodyPosition.x * this.worldScale;
      userData.y = bodyPosition.y * this.worldScale;
      userData.rotation = bodyAngle;
    }

  }
}
config.scene = Main;
window.game = new Phaser.Game(config);