

export default class Spaceship {

  constructor(image, name, earth, flames) {
    this.spaceshipImage = image;
    this.pos = createVector(width, random(height));
    this.velocity = -0.12;
    this.name = name;
    this.earth = earth;
    // this.radians = atan2(mouseY-height/2, mouseX-width/2);
    this.radians = 0;
    this.hasFinished = false;
    this.hasFinishedTime = 0;
    this.flames = flames;
    this.flameIndex = 0;
  }






  draw() {
    this.updateSpaceshipPosition();
    push();
    translate(this.pos.x, this.pos.y);
    this.radians = atan2(this.earth.x-this.pos.x, this.earth.y-this.pos.y);

    rotate(-this.radians+HALF_PI+PI);
    this.displayFollowerName();
    image(this.spaceshipImage, 0, 0,this.spaceshipImage.width *1.4, this.spaceshipImage.height *1.4);
    pop();
    this.drawFlames();



  }


  updateSpaceshipPosition() {
    if (abs(this.pos.x - this.earth.x) > 2) {
      let velocity = createVector(this.earth.x, this.earth.y);
      velocity.sub(this.pos);
      velocity.setMag(3);
      this.pos.add(velocity);
    } else {
     this.displayWelcomeMessage();
    }
  }

  displayWelcomeMessage() {
    this.hasFinished = true;
    this.hasFinishedTime++;
  }

  displayFollowerName() {

    fill(255);
    textAlign(LEFT);
    textSize(30);
    text(this.name, 150, 30);
  }

  drawFlames() {

    push();
    translate(this.pos.x, this.pos.y);
    rotate(-this.radians);
    if (this.flameIndex > 6) {
      this.flameIndex = 0;
    }
    image(this.flames[this.flameIndex], 0, 0, 30, 60);

    if (frameCount % 8 == 0) {
      this.flameIndex++;
    }

    pop();
  }


}