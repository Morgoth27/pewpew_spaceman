import React from "react";

import Game from "../components/Game.jsx"

// import playGame from "../assets/scenes/temp"




import Phaser from "phaser";
import Planck, { Circle, DistanceProxy, World } from "planck-js";
import { Vec2, Math,  } from "planck-js";



// Imported Images
import far_BG from "../assets/images/far_BG.jpg"
import stars from "../assets/images/stars.png";
import planet from "../assets/images/planets/PLANET.png";
import moon from "../assets/images/planets/MOON.png";
import dust_far from "../assets/images/dust_far.png";
import dust_close from "../assets/images/dust_close.png";
var farBG;
var starryBG;
var homePlanet;
var homeMoon;
var dustFar;
var dustClose;

// Station
import station from "../assets/images/station.png";
import stationSensorPNG from "../assets/images/station-sensor.png";
import station_indicator from "../assets/images/station_indicator.png";

// Player Ship
import ship_idle from "../assets/images/ship_idle.png";
import ship_idle_left from "../assets/images/ship_idle_left.png";
import ship_idle_right from "../assets/images/ship_idle_right.png";

import ship_move from "../assets/images/ship_move.png";
import ship_move_forward_left from "../assets/images/ship_move_forward_left.png";
import ship_move_forward_right from "../assets/images/ship_move_forward_right.png";

import ship_reverse from "../assets/images/ship_reverse.png";
import ship_reverse_left from "../assets/images/ship_reverse_left.png";
import ship_reverse_right from "../assets/images/ship_reverse_right.png";

import ship_boost from "../assets/images/ship_boost.png";
import ship_boost_forward_left from "../assets/images/ship_boost_forward_left.png";
import ship_boost_forward_right from "../assets/images/ship_boost_forward_right.png";

// Player Turret
import turret_fire from "../assets/images/turret_fire.png";
import turret_static from "../assets/images/turret.png";
var turret;


import bulletSprite from "../assets/images/bullet.png";
var boolet;



// Upgrades
import health_upgrade from "../assets/images/health_upgrade.png";
import damage_upgrade from "../assets/images/damage_upgrade.png";



// Enemies
import steel_stingray from "../assets/images/enemies/Steel_Stingray.png";
import space_urchin from "../assets/images/enemies/Space_Urchin.png";



// Imported Sounds
import emergency_alarm from "../assets/sound-effects/emergency-alarm.mp3";
var emergencySound;

import low_hum from "../assets/sound-effects/low-hum.mp3";
var humSound;

import turret_shot from "../assets/sound-effects/turret-shot.mp3";
var shotSound;



// Config For Game
var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "black",
  parent: "phaser-example",
  pixelArt: true,
  zoom: 1,
};



// SCORE
var SCORE = 0;



// Station and Ship stats
var SHIP = 2;
var SHIP_HEALTH = 500;
var STATION_HEALTH = 2000;
var STATION_SIZE = 25;
var IMMUNITY_FRAMES = 500;
var nextHitTime = 0;



// Boolet Stats
var BULLET = 4;
var FIRE_RELOAD_TIME = 200;
var BULLET_LIFE_TIME = 2500;
var BULLET_DAMAGE = 25;
var shooting = false;
var allowFireTime = 0;

// We need this for filtering mask bits later, it serves no purpose really but if we add asteroids it will be helpful
var ASTEROID = 14;



// Enemy Spawn Stuff
var MAX_ENEMIES = 10;
var WAVE_MULTIPLIER = 1;
var ENEMY_SPAWN_DELAYER;
var allowSpawnEnemy = 0;



// Body Arrays
var bulletBodies = [];



// Touch Detection Related Things
var COUNT = 1;
var sensor;
var touching = [];
var bodies = [];
var gravRange = STATION_SIZE * 1.5;



// Upgrade List
var allHealthUps = [];
var allDamageUps = [];



// Enemy List
var spaceUrchin;
var allUrchins = [];
var allBigUrchins = [];
var steelStingray;
var allRays = [];




// Set our globalTime to be 0. This will get updated every tick and we can use it to add delays/set timers.
var globalTime = 0;



// Adding variables that will later be used to create input detection
let keyA;
let keyS;
let keyD;
let keyW;
let LMB;

// Need this to make turret rotate
var x = window.innerWidth;
var y = window.innerHeight;
var mouseX = 0;
var mouseY = 0;



// Constructing our "Main" scene. For MVP this is the only scene, but in the future there will be many scenes to load.
class Main extends Phaser.Scene {
  // This is where we load all of our audio, spritesheets, and images to be used in the "create" section next.
  preload() {
    // Loading our backgrounds
    this.load.image('farBG', far_BG, {
      // frameWidth: 2800,
      // frameHeight: 2178
    });
    this.load.image('stars', stars, {
      // frameWidth: ,
      // frameHeight: 
    });
    this.load.spritesheet('planetSPIN', planet, {
      frameWidth: 200,
      frameHeight: 200
    });
    this.load.spritesheet('moonSPIN', moon, {
      frameWidth: 200,
      frameHeight: 200
    });
    this.load.image('dustFAR', dust_far, {

    });
    this.load.image('dustCLOSE', dust_close, {

    });



    // Loading our spritesheets
    // Station
    this.load.spritesheet("STATION", station, {
      frameWidth: 500,
      frameHeight: 500
    });
    this.load.spritesheet("STATIONSENSOR", stationSensorPNG, {
      frameWidth: 750,
      frameHeight: 750
    });
    this.load.spritesheet("STATIONINDICATOR", station_indicator, {
      frameWidth: 40,
      frameHeight: 40
    });

    // Ship
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

    // Upgrades
    this.load.spritesheet("healthUPGRADE", health_upgrade, {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("damageUPGRADE", damage_upgrade, {
      frameWidth: 256,
      frameHeight: 256
    });
    
    // Turret
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



    // Enemies
    this.load.spritesheet("steelSTINGRAY", steel_stingray, {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("spaceURCHIN", space_urchin, {
      frameWidth: 512,
      frameHeight: 512
    });




    // Loading our sound effects
    this.load.audio('emergencyALARM', emergency_alarm);

    this.load.audio('lowHUM', low_hum);

    this.load.audio('turretSHOT', turret_shot);
  }



  // This is where we build the starting blocks of the game. (Constructing our station, player, setting backgrounds and giving objects their sprites.) Keep in mind that the order you apply things matters, make sure to create and set your backgrounds first so they don't cover anything
  create() {
    // We have to put this at the top of any create function so that we can create bodies
    // Change the second number to adjust gravity
    let gravity = Planck.Vec2(0, 0);
    // Creates the world using the gravity settings we just made
    this.world = Planck.World(gravity);
    // Sets the scale of our world, since plank uses a different measurement system than pixels, we have to tell it that 30px = 1 "unit" in planck
    this.worldScale = 30;
    // Sets tick = 0
    this.tick = 0;

    // var ground = this.world.createBody({
    //   groupIndex : 1,
    // });



    // Adding our sounds and assigning them to the variables we created when we imported them
    
    // Starting ambient noise
    humSound = this.sound.add("lowHUM");
    humSound.volume = .05;
    // humSound.play();
    
    emergencySound = this.sound.add("emergencyALARM");

    shotSound = this.sound.add("turretSHOT");



    // Adding button input values to the variables we created earlier
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    // Lets us use the inputs above.
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.on('pointerdown', function (pointer) {

      shooting = true;

     });
     this.input.on('pointerup', function (pointer) {

      shooting = false;

     });



    // Set static furthest back background
    farBG = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'farBG').setScale(1.5).setScrollFactor(0);
    farBG.setDepth(-1000);
    // Add stars with transparent background and a low scrollfactor to add depth
    starryBG = this.add.tileSprite(0, 0, 10800, 10400, 'stars').setScrollFactor(.00085);
    starryBG.setDepth(-999);
    // Adding home planet with slightly higher scrollfactor than the stars
    homePlanet = this.add.sprite(-window.innerWidth / 5, 0, "planet").setScale(3.5).setScrollFactor(.006);
    homePlanet.setDepth(-998);
    homeMoon = this.add.sprite(window.innerWidth / 10, window.innerHeight / 5.75, "planet").setScale(1.5).setScrollFactor(.012);
    homeMoon.setDepth(-997);

    dustFar = this.add.sprite(0, 0, 'dustFAR').setScrollFactor(.35);
    dustFar.setDepth(-996);
    dustClose = this.add.sprite(0, 0, 'dustCLOSE').setScrollFactor(.75);
    dustClose.setDepth(-995);


    // Creating all of the animations we loaded
    // Home Planet Animations
    this.anims.create({
      key: "planet_spin_anim",
      frames: this.anims.generateFrameNumbers("planetSPIN"),
      frameRate: 6,
      repeat: -1,
    })
    homePlanet.play('planet_spin_anim', true)
    this.anims.create({
      key: "moon_spin_anim",
      frames: this.anims.generateFrameNumbers("moonSPIN"),
      frameRate: 6,
      repeat: -1,
    })
    homeMoon.play('moon_spin_anim', true)


    // Station Animations
    this.anims.create({
      key: "station_anim",
      frames: this.anims.generateFrameNumbers("STATION"),
      frameRate: 10,
      repeat: -1,
    })
    this.anims.create({
      key: "station_sensor_anim",
      frames: this.anims.generateFrameNumbers("STATIONSENSOR"),
      frameRate: 1,
      repeat: -1,
    })
    this.anims.create({
      key: "station_indicator_anim",
      frames: this.anims.generateFrameNumbers("STATIONINDICATOR"),
      frameRate: 1,
      repeat: -1,
    })



    // Ship Animations
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



    // Upgrade Animations
    this.anims.create({
      key: "health_upgrade_anim",
      frames: this.anims.generateFrameNumbers("healthUPGRADE"),
      frameRate: 3,
      repeat: -1,
    })
    this.anims.create({
      key: "damage_upgrade_anim",
      frames: this.anims.generateFrameNumbers("damageUPGRADE"),
      frameRate: 10,
      repeat: -1,
    })


    
    // Turret Animations
    this.anims.create({
      key: "turret_fire_anim",
      frames: this.anims.generateFrameNumbers("turretFIRE"),
      frameRate: 18,
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
      frameRate: 12,
      repeat: -1,
    });



    // Enemy Animations
    this.anims.create({
      key: "space_urchin_anim",
      frames: this.anims.generateFrameNumbers("spaceURCHIN"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "steel_stingray_anim",
      frames: this.anims.generateFrameNumbers("steelSTINGRAY"),
      frameRate: 5,
      repeat: -1,
    });



    // Call init() to generate our starting bodies
    // this.updateRange();
    this.createPlayer();
    this.createStation();



        // Adding a contact listener
    var player = this.turret;
    var playerHealth = this.playerBody.m_userData.health;
    // var destroy = this.world.destroyBody();
    // Detecting starting contact
    this.world.on('begin-contact', function(contact) {
      var fixtureA = contact.getFixtureA();
      var fixtureB = contact.getFixtureB();
      var userBodyA = fixtureA.getBody();
      var userBodyB = fixtureB.getBody();
      var userDataA = fixtureA.getBody().getUserData();
      var userDataB = fixtureB.getBody().getUserData();
      this.world = this.world;
      // var accessDestroy = destroy;
      if (userDataA) {
        userDataA.touching = true;
      }
      if (userDataB) {
        userDataB.touching = true;
      }
      // console.log(userDataA)
      // console.log(userDataB)
      var setPlayerHealth = playerHealth;
      // console.log('contact is working')



      // If an object has a "touching" userData setting, we want to set it to true; 
      if (userDataA.touching) {
        userDataA.touching = true;
      }
      if (userDataB.touching) {
        userDataB.touching = true;
      }



      // Station & Enemy Interaction
      if (userDataA.type === "Station" && userDataB.type === "Enemy") {
        // userDataA.damage = true;
        userDataA.beingHit = true;

      } else if (userDataA.type === "Enemy" && userDataB.type === "Station") {
        // userDataA.damage = true;
        userDataA.beingHit = true;

      }



      // Player & Enemy Interaction
      if (userDataA.type === "Player" && userDataB.type === "Enemy") {
        // userDataA.damage = true;
        // userDataA.health = userDataA.health - userDataB.damage;
        userDataA.beingHit = true;

      } else if (userDataA.type === "Enemy" && userDataB.type === "Player") {
        // userDataA.damage = true;
        userDataB.health = userDataB.health - userDataA.damage;
        userDataA.beingHit = true;

      } else if (userDataA.type === "Player" && userDataB.type === "HealthUp") {
        userDataA.health = userDataA.health + userDataB.upgradeVal;
        userDataB.gathered = true;
        console.log(userDataB)

      } else if (userDataA.type === "HealthUp" && userDataB.type === "Player") {
        userDataB.health = userDataB.health + userDataA.upgradeVal;
        userDataA.gathered = true;
        console.log(userDataA)

      } else if (userDataA.type === "Player" && userDataB.type === "DamageUp") {
        userDataA.damage = userDataA.damage + userDataB.upgradeVal;
        userDataB.gathered = true;
        console.log(userDataB)

      } else if (userDataA.type === "DamageUp" && userDataB.type === "Player") {
        userDataB.damage = userDataB.damage + userDataA.upgradeVal;
        userDataA.gathered = true;
        console.log(userDataA)
      }



      // Bullet & Anything Interaction 
      if (userDataA.type === "Boolet" && userDataB.type !== "Sensor" && userDataB.type !== "Station") {
        userDataB.health = userDataB.health - userDataA.damage;

        // Destroying Bullet
        userDataA.hit = true;
      } else if (userDataA.type === "Boolet" && userDataB.type !== "Sensor" && userDataB.type === "Station") {
        // Destroying Bullet but not dealing damage to the station
        userDataB.hit = true;
      }
      if (userDataB.type === "Boolet" && userDataA.type !== "Sensor" && userDataA.type !== "Station") {
        userDataA.health = userDataA.health - userDataB.damage;

        // Destroying Bullet
        userDataB.hit = true;
      } else if (userDataB.type === "Boolet" && userDataB.type !== "Sensor" && userDataA.type === "Station") {
        // Destroying Bullet but not dealing damage to the station
        userDataB.hit = true;
      }


      // if (fixtureA === sensor) {
      //   console.log("I'm sensor A")
      //   var userData = fixtureB.getBody().getUserData();
      //   if (userData) {
      //     userData.touching = true;
      //   }
      // }

      // if (fixtureB === sensor) {
      //   console.log("I'm sensor B")
      //   var userData = fixtureA.getBody().getUserData();
      //   if (userData) {
      //     userData.touching = true;
      //   }
      // }
    });

    // Detecting stopping contact
    this.world.on('end-contact', function(contact) {
      var fixtureA = contact.getFixtureA();
      var fixtureB = contact.getFixtureB();
      var userBodyA = fixtureA.getBody();
      var userBodyB = fixtureB.getBody();
      var userDataA = fixtureA.getBody().getUserData();
      var userDataB = fixtureB.getBody().getUserData();



      // This will make it so the object stops taking damage if it has the ability to. (Only applies when an emeny set beingHit to true in the 'begin-contact' listener above, if that didn't happen it won't change anything.)
      if (userDataA.beingHit) {
        userDataA.beingHit = false;
      }
      if (userDataB.beingHit) {
        userDataB.beingHit = false;
      }



      // Just like above, if it has "touching" in it's userData, we need to turn it back off now
      if (userDataA.touching) {
        userDataA.touching = false;
      }
      if (userDataB.touching) {
        userDataB.touching = false;
      }

      if (fixtureA === sensor) {
        if (userData) {
          userData.touching = false;
        }
      }

      if (fixtureB === sensor) {
        var userData = fixtureA.getBody().getUserData();
        if (userData) {
          userData.touching = false;
        }
      }
    });
    
    
    
    // Set any text or hud visuals we need here, since it's made last it will lay on top of everything else
    this.playerHealthText = this.add.text(50, 0, '', { fontSize: '50px', color: '#C13636' }).setScrollFactor(0).setOrigin(0.5);
    this.scoreText = this.add.text(window.innerWidth - 50, 0, '', { fontSize: '50px', color: '#C13636' }).setScrollFactor(0).setOrigin(0.5);
  }



  // Create station function
  createStation() {
    // We have to put this at the top of any create function so that we can create bodies
    // Change the second number to adjust gravity
    let gravity = Planck.Vec2(0, 0);
    // Creates the world using the gravity settings we just made
    // this.world = Planck.World(gravity);

    

    // Creating the station sensor which is just a big circle around the station that can detect when things go inside it's range
    this.sensor = this.add.sprite(0, 0, "STATIONSENSOR");
    this.sensor.play('STATIONSENSOR', true).setScale(3);
    this.sensor.setDepth(-100);
    this.sensor.type = "Sensor";
    this.sensor.touching = false;
    this.stationSensor =  this.world.createBody({
      position : Vec2(0, 0)
    });
    this.stationSensor.createFixture({
      shape: Planck.Circle(gravRange),
      isSensor: true,
    });
    // We aren't actually passing anything in here, but if we add more functionality to the sensor above this will apply it.
    this.stationSensor.setUserData(this.sensor);


    
    // this.station is where we assign things that we want to store inside this.stationBody's userData
    this.station = this.add.sprite(0, 0, "STATION");
    this.station.play('station_anim', true).setScale(3.1).setOrigin(.5, .516);
    // Here we are setting the health so that it's added to the stations userData
    this.station.health = STATION_HEALTH;
    this.station.type = "Station";
    // Touching will start out as false then get set to true on contact later, would be cool to make it's properties adjust when it's touching
    this.station.touching = false;
    this.station.name = "Station";
    this.station.beingHit = false;
    this.station.IFrames = IMMUNITY_FRAMES;

    
    // Creating the station body
    this.stationBody = this.world.createBody({
      position : Vec2(0, 0),
    });
    this.stationBody.setMassData({
      mass: Infinity,
      center: Planck.Vec2(),
      I: 1
    });
    this.stationBody.createFixture(Planck.Circle(STATION_SIZE));
    this.stationBody.setUserData(this.station);
    
    


    
    






    // let joint = this.world.createJoint(Planck.RevoluteJoint({
    //   bodyA: this.stationBody,
    //   bodyB: this.stationSensor,
    //   anchorPoint: this.stationBody.getLocalCenter(),
    // }));


  }
 
  
  
  // Create player function (and turret)
  createPlayer() {
    // We have to put this at the top of any create function so that we can create bodies
    // Change the second number to adjust gravity
    let gravity = Planck.Vec2(0, 0);
    // Creates the world using the gravity settings we just made
    this.world = Planck.World(gravity);
    
    
    
    // Setting up the information that we will store in playerBody's userData below
    this.player = this.add.sprite(200, 200, "shipIDLE").setOrigin(0.5, .41);
    this.player.setDepth(10);
    this.player.play("ship_idle_anim", true);
    this.player.setDepth(1);
    this.player.setScale(1);
    this.player.health = SHIP_HEALTH;
    this.player.name = "Player";
    this.player.type = "Player";
    this.player.damage = BULLET_DAMAGE;
    this.player.touching = false;
    this.player.beingHit = false;
    this.player.IFrames = IMMUNITY_FRAMES;
    // Making the camera follow the player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoom = .75

    // Creating playerBody
    this.playerBody = this.world.createDynamicBody({
      position: Vec2(-50, 0)
    });
    this.playerBody.createFixture(
      Planck.Circle(2),
    );  
    this.playerBody.setMassData({
      mass: 3,
      center: Planck.Vec2(),
      I: 1
    });
    this.playerBody.setAngularDamping(0.055);
    this.playerBody.setLinearDamping(0.055);
    this.playerBody.setUserData(this.player);



    // Creating the turret after the player because we want it to be rendered on top of the player
    this.turret = this.add.sprite(0, 0, "turretFIRE").setOrigin(0.5, .63 );
    this.turret.setDepth(11);
    this.turret.setScale(.8);
    this.turret.name = "Player Turret";
    this.turret.type = "Turret";
    this.turret.touching = false;
    this.turretBody = this.world.createDynamicBody({
      position: Vec2(0, 0)
    });
    // this.turretBody.createFixture(
    //   Planck.Circle(2)
    // );  
    this.turretBody.setMassData({
      mass: 0,
      center: Planck.Vec2(),
      I: 1
    });
    this.turretBody.setAngularDamping(6);
    this.turretBody.setUserData(this.turret);



    // Making Indicator
    this.indicator = this.add.sprite(0, 0, "STATIONINDICATOR").setOrigin(0.5, 10 );
    this.indicator.play('station_indicator_anim', true)
    this.indicator.setDepth(12);
    this.indicator.setScale(.8);
    this.indicator.name = "Station Indicator";
    this.indicator.type = "Indicator";
    this.indicator.touching = false;
    this.indicatorBody = this.world.createDynamicBody({
      position: Vec2(0, 0)
    });
    // this.turretBody.createFixture(
    //   Planck.Circle(2)
    // );  
    this.indicatorBody.setMassData({
      mass: 0,
      center: Planck.Vec2(),
      I: 1
    });
    this.indicatorBody.setAngularDamping(6);
    this.indicatorBody.setUserData(this.indicator);



    // Creating a joint to hold the turret and the player together. (The turret is still able to spin which is pog)
    let joint = this.world.createJoint(Planck.RevoluteJoint({
      bodyA: this.playerBody,
      bodyB: this.turretBody,
      anchorPoint: this.playerBody.getLocalCenter(),
    }));
    let joint2 = this.world.createJoint(Planck.RevoluteJoint({
      bodyA: this.playerBody,
      bodyB: this.indicatorBody,
      anchorPoint: this.playerBody.getLocalCenter(),
    }));
  }
  


  // Function that can be called from update to create a boolet
  createBoolet() {
    shotSound.volume = .45;
    shotSound.play();


    var angVEL = this.playerBody.getAngularVelocity();
    angVEL = -Math.abs(angVEL);
    
    
    // var magnitude = -6 + linVEL + angVEL, angle = -this.turretBody.getAngle(); 
    var magnitude = -6, angle = -this.turretBody.getAngle(); 

    boolet = this.add.sprite(0, 0, "bulletSHOT").setOrigin(0.5, .31).setScale(.5); 
    boolet.play('bullet_shot_anim', true);
    boolet.name = "Player Bullet";
    boolet.type = "Boolet";
    boolet.damage = this.playerBody.m_userData.damage;
    boolet.hit = false;
    // boolet.setScale(.5)
    // this.bullet.play('bullet_shot_anim', true);
    
    // Create a bullet body
    var bulletBody = this.world.createDynamicBody({
    });
    bulletBody.setDynamic({
    
    })
    bulletBody.createFixture(
      Planck.Circle(.05), {
        // mass : 1,
    });
    bulletBody.setPosition(this.turretBody.getWorldPoint(Vec2(0, -2.25)))
    bulletBody.setMassData({
      filterCategoryBits: BULLET,
      filterMaskBits: ASTEROID,
      mass : .025,
      bullet: true,
      center: Planck.Vec2(),
  
      I: 1,
    })
    bulletBody.setAngle(this.turretBody.getAngle()) 
    // this.bullet.play('bullet_shot_anim', true);
    
    bulletBody.dieTime = globalTime + BULLET_LIFE_TIME;
    allowFireTime = globalTime + FIRE_RELOAD_TIME;
    let shipVelocity = this.playerBody.m_linearVelocity;

    let turretVelocity = this.turretBody.getWorldVector(Vec2(0,magnitude))

    let velocity = Vec2( shipVelocity.x + turretVelocity.x,  shipVelocity.y + turretVelocity.y)
    bulletBody.setLinearVelocity(velocity)
    // bulletBody.setLinearVelocity(Vec2(linVELX, linVELY))
    bulletBody.setUserData(boolet);
    bulletBodies.push(bulletBody);
  }



  // Create random enemy
  spawnEnemy() {
    var rarityDecider = Math.floor((Math.random() * 100));
    var posistionDeciderX = Math.round(Math.random() * 1);
    var posistionDeciderY = Math.round(Math.random() * 1);
    var x;
    var y;
    if (posistionDeciderX === 0) {
      x = -(Math.random() * 100) - window.innerWidth / 25;
    } else {
      x = (Math.random() * 100) + window.innerWidth / 25;
    }
    if (posistionDeciderY === 0) {
      y = -(Math.random() * 100) - window.innerHeight / 25;
    } else {
      y = (Math.random() * 100) + window.innerHeight / 25;
    }
    // console.log(x)
    // console.log(y)

    if (rarityDecider < 10) {
      // console.log('thats a 10% chance')
      this.spaceUrchin = this.add.sprite(0, 0, "spaceURCHIN").setScale(.15); 
      this.spaceUrchin.play("space_urchin_anim", true);
      this.spaceUrchin.name = "Space Urchin";
      this.spaceUrchin.type = "Enemy";
      this.spaceUrchin.maxHealth = 100;
      this.spaceUrchin.health = 100;
      this.spaceUrchin.touching = false;
      this.spaceUrchinBody = this.world.createBody()
      this.spaceUrchinBody.setDynamic();
      this.spaceUrchinBody.createFixture(Planck.Circle(1), {
        density : 5,
        friction : 1,
      });
      this.spaceUrchinBody.setPosition(Vec2(x , y))
      // spaceUrchinBody.setAngle(Phaser.Math.Angle.Between(0, 0, (x), (y)) + Math.PI / 2);
      // var magnitude = -10, angle = Phaser.Math.Angle.Between(0, 0, (x), (y)) + Math.PI / 2; 
      // console.log(spaceUrchinBody.getAngle())
      // spaceUrchinBody.setLinearVelocity(Vec2(0, magnitude));
      this.spaceUrchinBody.setUserData(this.spaceUrchin)
      allUrchins.push(this.spaceUrchinBody);

    } else if (rarityDecider >= 10 && rarityDecider < 20) {
      steelStingray = this.add.sprite(0, 0, "steelSTINGRAY").setScale(.75); 
      steelStingray.play("steel_stingray_anim", true);
      steelStingray.name = "Space Urchin";
      steelStingray.type = "Enemy";
      steelStingray.maxHealth = 150;
      steelStingray.health = 150;
      steelStingray.touching = false;
      steelStingray.damage = 50;
      var steelStingrayBody = this.world.createBody()
      steelStingrayBody.setDynamic();
      steelStingrayBody.setLinearDamping(.005)
      steelStingrayBody.createFixture(Planck.Circle(1), {
        density : 2,
        friction : 1,
      });
      steelStingrayBody.setPosition(Vec2(x, y))
      // steelStingrayBody.setAngle()
      // steelStingrayBody.setLinearVelocity()
      steelStingrayBody.setUserData(steelStingray)
      allRays.push(steelStingrayBody);
    } else if (rarityDecider > 98) {
      this.giantSpaceUrchin = this.add.sprite(0, 0, "spaceURCHIN").setScale(2); 
      this.giantSpaceUrchin.play("space_urchin_anim", true);
      this.giantSpaceUrchin.name = "Space Urchin";
      this.giantSpaceUrchin.type = "Enemy";
      this.giantSpaceUrchin.maxHealth = 1000000;
      this.giantSpaceUrchin.health = 1000000;
      this.giantSpaceUrchin.touching = false;
      this.giantSpaceUrchinBody = this.world.createBody()
      this.giantSpaceUrchinBody.setDynamic();
      this.giantSpaceUrchinBody.createFixture(Planck.Circle(8), {
        density : 5000,
        friction : 1,
      });
      this.giantSpaceUrchinBody.setPosition(Vec2(x, y))
      this.giantSpaceUrchinBody.setUserData(this.giantSpaceUrchin)
      allBigUrchins.push(this.giantSpaceUrchinBody);
    }
  };



  // Create a circle object that will be an upgrade eventually
  createUpgrade(x, y) {

    var healthOrDamage = Math.round(Math.random() * 1);


    var circle = Planck.Circle(.5);
        
    if (healthOrDamage === 1) {
      this.healthUp = this.add.sprite(0, 0, "healthUPGRADE").setScale(2); 
      this.healthUp.play("health_upgrade_anim", true);
      this.healthUp.type = "HealthUp";
      this.healthUp.upgradeVal = 10;
      this.healthUp.gathered = false;
      this.healthUpBody = this.world.createBody();
      this.healthUpBody.setDynamic();
      this.healthUpBody.createFixture(Planck.Circle(1), {
        density : 1,
        friction : 1,
        touching : false,
      });
      this.healthUpBody.setPosition(Vec2(x, y))
      this.healthUpBody.setLinearDamping(.5);
      this.healthUpBody.setUserData(this.healthUp)
      allHealthUps.push(this.healthUpBody);
    } else {
      this.damageUp = this.add.sprite(0, 0, "damageUPGRADE").setScale(.75); 
      this.damageUp.play("damage_upgrade_anim", true);
      this.damageUp.type = "DamageUp";
      this.damageUp.upgradeVal = 10;
      this.damageUp.gathered = false;
      this.damageUpBody = this.world.createBody();
      this.damageUpBody.setDynamic();
      this.damageUpBody.createFixture(Planck.Circle(1), {
        density : 1,
        friction : 1,
        touching : false,
      });
      this.damageUpBody.setPosition(Vec2(x, y))
      this.damageUpBody.setLinearDamping(.5);
      this.damageUpBody.setUserData(this.damageUp)
      allDamageUps.push(this.damageUpBody);
    }
  }



  // This is where most of the gameplay is happening, update() is called over and over again and any function that runs inside it will run every tick unless told not to for any reason
  update(dt) {
    // Adding 1 to the tick variable we created in the beginning, this will increment by 1 every game loop and we can use it to calculate when we want things to be happening
    this.tick++;
    // Updating the globalTime variable to be equal to the current tick we are on
    // Not sure why I didn't make it update to be equal to this.tick but I'm not changing it because it works
    globalTime = dt;
    // Tells the game how frequently to update, here we are setting the game to run update every 1/20th of a second
    this.world.step(1 / 20);



    // Checking if the ambient noise stopped playing and starting it again if it did
    if (!humSound.isPlaying) {
      humSound.play()
    }



    // Making some variables that makes our life easier in the following functions. (For UI variables please use the next section and make the variable right before you need it)
    // const sensor = this.stationBody;
    const stationDATA = this.stationBody.m_userData;
    const player = this.playerBody;
    const playerDATA = player.m_userData;
    var playerX = player.getPosition().x;
    var playerY = player.getPosition().y;
    const turret = this.turretBody;
    const turretData = this.turret.m_userData;
    const { cursors } = this;
    const { mouse } = this;

    // Some more useful variables
    // This is used in our turret firing function to determine if we can shoot yet
    var ableToFire = globalTime > allowFireTime;
    // This is used in a function below to give the player immunity for a brief time after getting hit
    var ableToBeHit = (nextHitTime < globalTime);

    var spaceUrchin = this.spaceUrchinBody;
    // var x = spaceUrchin.getPosition();


    // this.spaceUrchinBody.setPosition(Vec2(x , y))
    // LOCATOR
    for (var i = 0; i < allUrchins.length; i++) {
      var urchin = allUrchins[i];
      var urchinX = urchin.getPosition().x;
      var urchinY = urchin.getPosition().y;
      urchin.setAngle(Phaser.Math.Angle.Between(playerX, playerY, (urchinX), (urchinY)) + Math.PI / 2);
      var speed = .525, angle = Phaser.Math.Angle.Between(playerX, playerY, (urchinX), (urchinY)) + Math.PI / 2; 
      // console.log(urchin.getAngle())
      // var urchinF = urchin.getWorldVector(Vec2(0.0, .25));
      // var urchinP = urchin.getWorldPoint(Vec2(0.0, .25));
      urchin.setLinearVelocity(urchin.getWorldVector(Vec2(0, speed, true)));
    }
    // if (this.giantSpaceUrchinBody) {
    //   var bigx = bigUrchin.getPosition().x;
    //   var bigy = bigUrchin.getPosition().y;
    // }
    for (var i = 0; i < allBigUrchins.length; i++) {
      var bigUrchin = allBigUrchins[i];
      var bigx = bigUrchin.getPosition().x;
      var bigy = bigUrchin.getPosition().y;
      bigUrchin.setAngle(Phaser.Math.Angle.Between(0, 0, (bigx), (bigy)) + Math.PI / 2);
      var attackForce = -1, angle = Phaser.Math.Angle.Between(0, 0, (bigx), (bigy)) + Math.PI / 2; 
      // console.log(attackForce);
      // console.log(spaceUrchinBody.getAngle())
      bigUrchin.setLinearVelocity(bigUrchin.getWorldVector(Vec2(0, attackForce)));
    }
    for (var i = 0; i < allRays.length; i++) {
      var ray = allRays[i];
      var rayX = ray.getPosition().x;
      var rayY = ray.getPosition().y;
      ray.setAngle(Phaser.Math.Angle.Between(playerX, playerY, (rayX), (rayY)) - Math.PI / 2);
      // var speed = -1, angle = Phaser.Math.Angle.Between(0, 0, (rayX), (rayY)) - Math.PI / 2; 
      // console.log(urchin.getAngle())
      // var urchinF = urchin.getWorldVector(Vec2(0.0, .25));
      // var urchinP = urchin.getWorldPoint(Vec2(0.0, .25));
      // ray.setLinearVelocity(ray.getWorldVector(Vec2(0, speed, true)));
      var rayf = ray.getWorldVector(Vec2(0.0, -0.00595));
      var rayp = ray.getWorldPoint(Vec2(0.0, -0.00595));
      ray.applyLinearImpulse(rayf, rayp, true);
    }


    // Use this section to update any text or information that is displayed on the hud interface
    this.scoreText.text = "Score: " + SCORE;
    this.indicatorBody.setAngle(Phaser.Math.Angle.Between(0, 0, (playerX), (playerY)) - Math.PI / 2)



    // Setting up damage being applied to the STATION and PLAYER
    if (stationDATA.beingHit === true && ableToBeHit) {
      stationDATA.health = stationDATA.health - 10;

      nextHitTime = globalTime + stationDATA.IFrames;
    }
    if (playerDATA.beingHit === true && ableToBeHit) {
      playerDATA.health = playerDATA.health - 25;

      nextHitTime = globalTime + playerDATA.IFrames;
    }



    // If player = ded, function = mock
    var playerHealthText = this.playerHealthText;
    const gameOver = document.querySelector('.GOWindow');
    if (playerDATA.health <= -25) {
      console.log('you died lol');
      playerHealthText.text = "Ship Health: ded";
      this.world.destroyBody(player);
      playerDATA.destroy();
      emergencySound.volume = .5;
      emergencySound.play();
      gameOver.style.bottom = "0%";
      gameOver.style.background = "rgba(14, 0, 0, 0.8)";
    } else {
      playerHealthText.text = "Ship Health: " + playerDATA.health;
    }



    // Destroying Upgrades After they are picked up
    for (var i = 0; i < allHealthUps.length; i++) {
      var healthUps = allHealthUps[i];

      if (healthUps.m_userData.gathered === true) {
        allHealthUps.splice(i, 1);
        this.world.destroyBody(healthUps);
        healthUps.m_userData.destroy();
        i--;
        continue;
      }
    }
    for (var i = 0; i < allDamageUps.length; i++) {
      var damageUps = allDamageUps[i];

      if (damageUps.m_userData.gathered === true) {
        allDamageUps.splice(i, 1);
        this.world.destroyBody(damageUps);
        damageUps.m_userData.destroy();
        i--;
        continue;
      }
    }



    // Check how old each of our bullets are and delete them if they pass a certain age determined near the top under the BULLET_LIFE_TIME variable
    for (var i = 0; i < bulletBodies.length; i++) {
      var bulletBody = bulletBodies[i];
      // If a bullet hits something, delete it
      if (bulletBody.m_userData.hit === true) {
        bulletBodies.splice(i, 1);
        // If we want to destroy a body we must also destroy it's userdata assuming we want it permanently gone. I'm not positive but I assume it's smarter to destroy the userdata first?
        this.world.destroyBody(bulletBody);
        bulletBody.m_userData.destroy();
        i--;
        continue;
      }
      // If the bullet is old, delete it
      if (bulletBody.dieTime <= globalTime) {
        bulletBodies.splice(i, 1);
        // If we want to destroy a body we must also destroy it's userdata assuming we want it permanently gone. I'm not positive but I assume it's smarter to destroy the userdata first?
        this.world.destroyBody(bulletBody);
        bulletBody.m_userData.destroy();
        i--;
        continue;
      }
    }

    // Deleting Enemies if their health stat = 0.
    for (var i = 0; i < allUrchins.length; i++) {
      var enemyBody = allUrchins[i];
      var upgradeChance = Math.round(Math.random() * 100);

      if (enemyBody.m_userData.health <= 0) {
        var enemyX = enemyBody.getPosition().x;
        var enemyY = enemyBody.getPosition().y;
        if (upgradeChance < 10) {
          this.createUpgrade(enemyX, enemyY);
        }
        console.log(enemyX);
        SCORE = SCORE + enemyBody.m_userData.maxHealth;
        WAVE_MULTIPLIER += .05;
        allUrchins.splice(i, 1);
        enemyBody.m_userData.destroy();
        this.world.destroyBody(enemyBody);
        i--
        continue;
      }
    }
    for (var i = 0; i < allRays.length; i++) {
      var enemyBody = allRays[i];
      // console.log(enemyBody)
      if (enemyBody.m_userData.health <= 0) {
        var enemyX = enemyBody.getPosition().x;
        var enemyY = enemyBody.getPosition().y;
        if (upgradeChance < 10) {
          this.createUpgrade(enemyX, enemyY);
        }
        SCORE = SCORE + enemyBody.m_userData.maxHealth;
        WAVE_MULTIPLIER += .05;
        allRays.splice(i, 1);
        enemyBody.m_userData.destroy();
        this.world.destroyBody(enemyBody);
        i--
        continue;
      }
    }



    if (ableToFire && shooting === true) {
      this.createBoolet();
      this.turret.play('turret_fire_anim', true);
    } else if (!ableToFire && shooting === true) {
      this.turret.play('turret_fire_anim', true);
    } else {
      this.turret.play('turret_static_anim').setScale(.6);
    }



    // Setting up user input :'(
    if (cursors.space.isDown) {
      console.log(this.world.getBodyCount())
      this.spawnEnemy()
      console.log("Using ablility!")

      const canvas = document.querySelector('canvas');
      canvas.style.display = "none";
    }



    // Updating turret angle on mousemove
    this.input.once('pointermove', function (pointer) {

      mouseX = pointer.x;
      mouseY = pointer.y;

      turret.setAngle(Phaser.Math.Angle.Between(mouseX, mouseY, (x / 2), (y / 2)) - Math.PI / 2);

          // Camera Offset
        // We can adjust this to make the camera follow from a different position, 0, 0 will center the player
        // var cameraOffset = this.turretBody.getAngle();
        // console.log(cameraOffset)
        // this.cameras.main.followOffset.set(Phaser.Math.Angle.Between(mouseX, mouseY, (x / 2), (y / 2)));


        // .setPosition(this.turretBody.getWorldPoint(Vec2(0, -1.25)))




      // if (mouseX > window.innerWidth / 10) {
      //   this.cameras.main.followOffset.set(0, 10);
      // }
    });



    // EVERYTHING ELSE
    // No keys pressed = play idle ship animation
    var idling = 0.0075;
    var W = 0.09;
    var A = 0.045;
    var S = 0.055;
    var D = 0.045;
    var shift = 0.15;



    if (!keyW.isDown && !keyA.isDown  && !keyS.isDown && !keyD.isDown && !cursors.shift.isDown) {
      humSound.volume = idling;

      this.player.play('ship_idle_anim', true).setScale(.75);

    // BACKWARDS 
    } else if (!keyW.isDown && !keyA.isDown && keyS.isDown && !keyD.isDown && !cursors.shift.isDown) {
      humSound.volume = .045;
      

      var f = player.getWorldVector(Vec2(0.0, 0.01));
      var p = player.getWorldPoint(Vec2(0.0, 0.02));
      player.applyLinearImpulse(f, p, true);
      this.player.play('ship_reverse_anim', true);

    //  BACKWARDS LEFT
    } else if (!keyW.isDown && keyA.isDown && keyS.isDown && !keyD.isDown && !cursors.shift.isDown) {
      humSound.volume = A + S;

      var f = player.getWorldVector(Vec2(0.0, 0.01));
      var p = player.getWorldPoint(Vec2(0.0, 0.02));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(-0.00095);
      this.player.play('ship_reverse_left_anim', true);

    // BACKWARDS RIGHT
    } else if (!keyW.isDown && !keyA.isDown && keyS.isDown && keyD.isDown && !cursors.shift.isDown) {
      humSound.volume = S + D;

      var f = player.getWorldVector(Vec2(0.0, 0.01));
      var p = player.getWorldPoint(Vec2(0.0, 0.02));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(0.00095);
      this.player.play('ship_reverse_right_anim', true);

    // BOOST BACKWARDS
    } else if (!keyW.isDown && !keyA.isDown && keyS.isDown && !keyD.isDown && cursors.shift.isDown) {
      humSound.volume = S + shift;

      var f = player.getWorldVector(Vec2(0.0, 0.06));
      var p = player.getWorldPoint(Vec2(0.0, 0.07));
      player.applyLinearImpulse(f, p, true);
      this.player.play('ship_reverse_anim', true);

    // BOOST BACKWARDS LEFT
    } else if (!keyW.isDown && keyA.isDown && keyS.isDown && !keyD.isDown && cursors.shift.isDown) {
      humSound.volume = A + S + shift;

      var f = player.getWorldVector(Vec2(0.0, 0.06));
      var p = player.getWorldPoint(Vec2(0.0, 0.07));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(-0.00095);
      this.player.play('ship_reverse_left_anim', true);

    // BOOST BACKWARDS RIGHT
    } else if (!keyW.isDown && !keyA.isDown && keyS.isDown && keyD.isDown && cursors.shift.isDown) {
      humSound.volume = S + D + shift;

      var f = player.getWorldVector(Vec2(0.0, 0.06));
      var p = player.getWorldPoint(Vec2(0.0, 0.07));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(0.00095);
      this.player.play('ship_reverse_right_anim', true);

    // FORWARDS
    } else if (keyW.isDown && !keyA.isDown && !keyS.isDown && !keyD.isDown && !cursors.shift.isDown) {
      humSound.volume = W + idling;

      var f = player.getWorldVector(Vec2(0.0, -0.01));
      var p = player.getWorldPoint(Vec2(0.0, -0.02));
      player.applyLinearImpulse(f, p, true);
      this.player.play('ship_move_anim', true);

    // BOOST FORWARDS
    } else if (keyW.isDown && !keyA.isDown && !keyS.isDown && !keyD.isDown && cursors.shift.isDown) {
      humSound.volume = W + shift;

      var f = player.getWorldVector(Vec2(0.0, -0.041));
      var p = player.getWorldPoint(Vec2(0.0, -0.052));
      player.applyLinearImpulse(f, p, true);
      this.player.play('ship_boost_anim', true);

    // BOOST SHIFT ONLY
    } else if (!keyW.isDown && !keyA.isDown && !keyS.isDown && keyD.isDown && cursors.shift.isDown) {
      humSound.volume = D + shift;

      var f = player.getWorldVector(Vec2(0.0, -0.041));
      var p = player.getWorldPoint(Vec2(0.0, -0.052));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(0.00095);
      this.player.play('ship_boost_forward_right_anim', true);

    // BOOST RIGHT
    } else if (!keyW.isDown && keyA.isDown && !keyS.isDown && !keyD.isDown && cursors.shift.isDown) {
      humSound.volume = A + shift;

      var f = player.getWorldVector(Vec2(0.0, -0.041));
      var p = player.getWorldPoint(Vec2(0.0, -0.052));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(-0.00095);
      this.player.play('ship_boost_forward_left_anim', true);

    // LEFT ONLY
    } else if (!keyW.isDown && keyA.isDown && !keyS.isDown && !keyD.isDown && !cursors.shift.isDown) {
      humSound.volume = A + idling;

      player.applyAngularImpulse(-0.00095);
      var f = player.getWorldVector(Vec2(0.0, -0.00001));
      var p = player.getWorldPoint(Vec2(0.0, -0.00001));
      player.applyLinearImpulse(f, p, true);
      this.player.play('ship_idle_left_anim', true);

    // FORWARDS LEFT
    } else if (keyW.isDown && keyA.isDown && !keyS.isDown && !keyD.isDown && !cursors.shift.isDown) {
      humSound.volume = W + A;

      player.applyAngularImpulse(-0.00095);
      var f = player.getWorldVector(Vec2(0.0, -0.01));
      var p = player.getWorldPoint(Vec2(0.0, -0.02));
      player.applyLinearImpulse(f, p, true);
      this.player.play('ship_move_forward_left_anim', true);

    // BOOST FORWARDS LEFT
    } else if (keyW.isDown && keyA.isDown && !keyS.isDown && !keyD.isDown && cursors.shift.isDown) {
      humSound.volume = W + A + shift;

      player.applyAngularImpulse(-0.00095);
      var f = player.getWorldVector(Vec2(0.0, -0.041));
      var p = player.getWorldPoint(Vec2(0.0, -0.052));
      player.applyLinearImpulse(f, p, true);
      this.player.play('ship_boost_forward_left_anim', true);

    // RIGHT ONLY
    } else if (!keyW.isDown && !keyA.isDown && !keyS.isDown && keyD.isDown && !cursors.shift.isDown) {
      humSound.volume = D + idling;

      player.applyAngularImpulse(0.00095);
      var f = player.getWorldVector(Vec2(0.0, -0.00001));
      var p = player.getWorldPoint(Vec2(0.0, -0.00001));
      player.applyLinearImpulse(f, p, true);
      this.player.play('ship_idle_right_anim', true);

    // FORWARDS RIGHT
    } else if (keyW.isDown && !keyA.isDown && !keyS.isDown && keyD.isDown && !cursors.shift.isDown) {
      humSound.volume = W + D;

      var f = player.getWorldVector(Vec2(0.0, -0.01));
      var p = player.getWorldPoint(Vec2(0.0, -0.02));
      player.applyLinearImpulse(f, p, true);
      player.applyAngularImpulse(0.00095);
      this.player.play('ship_move_forward_right_anim', true);

    // BOOST FORWARDS RIGHT
    } else if (keyW.isDown && !keyA.isDown && !keyS.isDown && keyD.isDown && cursors.shift.isDown) {
      humSound.volume = W + D + shift;

      player.applyAngularImpulse(0.00095);
      var f = player.getWorldVector(Vec2(0.0, -0.041));
      var p = player.getWorldPoint(Vec2(0.0, -0.052));
      player.applyLinearImpulse(f, p, true);
      this.player.play('ship_boost_forward_right_anim', true);
    }



    // Check how many bodies their are and add more if it goes below a certain amount
    // console.log(this.world.getBodyCount())
    var currentBodyCount = this.world.getBodyCount();
    var currentWaveAmount = Math.ceil(MAX_ENEMIES * WAVE_MULTIPLIER)
    // console.log(WAVE_MULTIPLIER)
    // console.log(currentWaveAmount)
    if (currentBodyCount - 6 < currentWaveAmount) {
      var bodyCount = this.world.getBodyCount();

        this.spawnEnemy();


    }


    // Here we iterate through all the bodies and get their position
    try {
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
    } catch (err) {
      console.log(err.message)
    }

    this.world.clearForces();
  }
}



// Sets the scene to "main", which is our only scene so this is simple
config.scene = Main;
// window.game = new Phaser.Game(config);  









export default class App extends React.Component {
  render() {
    { window.game = new Phaser.Game(config) }
		return (
			<>
                
                <script src="../assets/engine/phaser.min.js"></script>

                <div className="GOWindow">
                  <div className="gameOver">
                    <div className="gameOverHeader">Game Over</div>
                    <div className="scoreHolder">
                      <div className="score">Score:</div>
                      <div className="playerScore">{SCORE}</div>
                    </div>
                    <form action="" method="post" class="submitScoreForm" data-visible="true">
                      <button type="submit" className="clickable" id="submitScore">Submit Score</button>
                    </form> 
                    <div className="retryOrHome">
                      <div className="returnHome clickable">Home</div>
                      <div className="retryGame clickable">Retry</div>
                    </div>
                  </div>
                </div>

                

                <Game />

			</>
		);
	}
}