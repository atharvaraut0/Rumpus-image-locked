//Env Setup
let pg;
let ivoryMedium, ivoryBold, ivoryItalic, eugenio;
let cnv;
let img;

//Preload Text///////////////////////////////////////////////////////////////
function preload() {
  img = loadImage('rumpus logo 1.png');
}


//Main Sketch Setup////////////////////////////////////////////////////////////

function setup() {
  cnv = createCanvas(960, int(windowHeight / 1.4), P2D);
  cnv.parent('kinetic-type');
  pg = createGraphics(width, height, P2D);
  frameRate(30);

}


function draw() {

  //Global Vars
  let mainAmp = 50;
  let ambAmp = 3;
  let tiles = 130;
  let mouseDist = 140;
  let offsetMultiplier = 3;
  let speedMultiplier = 0.1;

  background(255);

  pg.background(255);
  pg.fill(0);

  let scaledHeight = pg.width * (img.height / img.width);
  let yOffset = (pg.height - scaledHeight) / 2;

  pg.image(img, 0, yOffset, width, width * img.height / img.width);

  

  //Set up tiles
  let tilesX = tiles;
  let tilesY = Math.round((tilesX * height) / width);
  let tileW = (width / tilesX);
  let tileH = (height / tilesY);
  let maxDist = mouseDist + cos(frameCount * speedMultiplier) * (mouseDist / 2);
  let maxAmbDist = mouseDist * 5.5;

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {

      //Define Displacement
      let wave;
      let ambient;

      //Source
      let sx = Math.floor(x * tileW);
      let sy = Math.floor(y * tileH);
      let sw = Math.ceil(tileW);
      let sh = Math.ceil(tileH);

      //Destination
      let dx = sx;
      let dy = sy;
      let dw = sw;
      let dh = sh;

      //Tile Centers
      let cx = sx + tileW / 2;
      let cy = sy + tileH / 2;

      //Mouse Distance
      let distance = dist(pmouseX - 2, pmouseY - 4, cx, cy);
      let ambDist = map(distance, 0, maxAmbDist, 1, 0);

      distance = constrain(distance, 0, maxDist);
      distance = map(distance, 0, maxDist, 1, 0);

      //Assign Displacements

      wave = int(sin(frameCount * speedMultiplier + (x + y) * offsetMultiplier * 0.1) * mainAmp * distance);

      ambient = (sin(frameCount * speedMultiplier * 2 + floor((x + y) / (height / width)) * offsetMultiplier) * ambAmp * ambDist);

      dx += wave;
      sw += ambient;

      // Final Copy //
      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }
}