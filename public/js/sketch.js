import Spaceship from './Spaceship.js';
import PlanetCodeheir from './PlanetCodeheir.js';
import {TOKEN_API} from "./constants.js";

let socket;
let spaceship;
let planetCodeheir;
let started = false;
let spaceshipImages = [];
let spaceships = [];
const streamlabs = io(`https://sockets.streamlabs.com?token=${TOKEN_API}`);

window.setup = function() {
  createCanvas(1920, 1080);
  streamlabs.on('event', (eventData) => {
    processNewFollower(eventData);
  });

  socket = io.connect("http://localhost:1200");
  getAllSpaceshipImages();
  let planetCodeheirImage = loadImage("images/planet-codeheir.png");
  planetCodeheir = new PlanetCodeheir(planetCodeheirImage);
  noLoop();
};

function newFollower(name) {
  let speech = new p5.Speech();
  speech.speak("Welcome, to planet code heir, " + name);

  let spaceship = new Spaceship(random(spaceshipImages), name, planetCodeheir);
  spaceships.push(spaceship);
  started = true;
  loop();

}

window.draw = function() {
  if (started) {
    clear();
    let haveAllShipsFinished = true;
    for (const ship of spaceships) {
      ship.draw();
      if (ship.hasFinished) {
        if (ship.hasFinishedTime < 120) {
          haveAllShipsFinished = false;
        }
      } else {
        haveAllShipsFinished = false;
      }
    }
    planetCodeheir.drawPlanetCodeheir();
    if (haveAllShipsFinished) {
      started = false;

      spaceships = [];
      noLoop();
      clear();
    }






  }
};



function getAllSpaceshipImages() {
  let spaceshipImage1 = loadImage("images/spaceship.png");
  spaceshipImages.push(spaceshipImage1);

  let spaceshipImage2 = loadImage("images/spaceship2.png");
  spaceshipImages.push(spaceshipImage2);

  let spaceshipImage5 = loadImage("images/spaceship5.png");
  spaceshipImages.push(spaceshipImage5);

}

function processNewFollower(eventData) {
  if (eventData.for === 'twitch_account') {
    if (eventData.type === 'follow') {
      // newFollower(eventData.message[0].from);
      newFollower(eventData.message[0].name);
    }
  }
}
