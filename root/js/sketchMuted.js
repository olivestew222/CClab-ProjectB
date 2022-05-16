let music; //preload
let fft; //preload 
let button;  //toggle
let move =0; //turn in circular motion
let lines; //segmenting the sound variables
let amp; //amplitude
let ampB; 
let spins; //rotation
let beats = []; //will analyze upper freq, disp array

function preload() {
  music = loadSound("assets/aphex.mp3");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);//canvas move w canvas
  background(0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);
  fft = new p5.FFT();
  
}

function draw() { 
  let spins = fft.analyze();
     
  fill(255);
  strokeWeight(1);
  translate(width / 2, height / 2);
  for (let i = 0; i < spins.length; i++) {
    let angle = map(i, 0, spins.length, -1, 360)*move; //turning motion, rep
    let amp = spins[i];
      let vertex = map(amp, 1, 200, 1, windowWidth/2);//move around vertex
 
    let x = vertex * sin(angle/3); //angle move x/y
    let y = vertex * cos(angle/3);
    
    strokeWeight(1);
    let flow = amp/5; //reach of lines
    stroke(angle/flow,255, angle/flow); //color change w/ amp move  - angle/ amp (color intensity/motion)
    line(0, 0, x, y);  //line pos
    
     // mouseXpo = map(mouseX, 0, width, 2, 1);
    
     // mouseYpo = map(mouseY, 0, height, windowHeight / 8, windowHeight / 6);
    
   // while(mouseXpo>=windowWidth/2)  {
     // stroke(255,angle/flow, 150);
   // }  
  }
    b = new Beat();
  beats.push(b);
  
  for (let i = 0; i <beats.length; i++){
    beats[i].show();
    beats[i].push(ampB);
    }
  move+=0.02; //turns right in circular motion-- speed
}  

class Beat{
  constructor(){
      
  fft.analyze();
  this.ampB = fft.getEnergy(10, [50]); //pull frequency from high range- so motion @ higher intensity //https://p5js.org/reference/#/p5.FFT/getEnergy
        
    
    this.bass = createVector(0,0);
    this.pos = p5.Vector.random2D(); //https://p5js.org/reference/#/p5.Vector/random2D
    
    this.r = random(10);
    if(this.ampB>50){
      this.pos.mult(random(width/4,width));
    }
    else{
    this.pos.setMag(100);
    }
    this.speedX= 3;
    this.speedY=2;
  }
  
  show(){
    noStroke();//place in circles around vertex big-- small
    this.surround= ellipse(this.pos.x, this.pos.y,3);
    this.surroundA =  ellipse(this.pos.x*2, this.pos.y*2,2);
   this.surroundB= ellipse(this.pos.x*3, this.pos.y*3,1);
    
  }
  push(){
    fill(100);
    this.x= this.x+random(-this.speedX, this.speedX);
    this.y = this.y + random(-this.speedY, this.speedY);
  }
}

function mousePressed(){
  if(music.isPlaying()){
    music.pause();
    background(255);
  }
  else{
    music.play();
    background(0);
  }
}

