
export default class PlanetCodeheir {
  constructor(imageOfPlanet) {
    this.x = 200;
    this.y = height/2.5;
    this.planetImage = imageOfPlanet;
    this.angle = 1;
  }



  drawPlanetCodeheir() {
    push();
    this.angle+= 0.01;
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.planetImage, 0, 0, this.planetImage.width * 0.4, this.planetImage.height*0.4);
    pop();
  }


}