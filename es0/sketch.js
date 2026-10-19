const larghezzaCanvas = 800;
const altezzaCanvas = 600;
const coloreSfondo = 0;

let tono;
let dx = 2;
let dy = 2;

function setup() {
  createCanvas(800, 600);
  colorMode(HSL, 360, 100, 100);
  tono = random(360);
  background(20, 0, 15);
}

function draw() {
  if (mouseIsPressed) {
    stroke(100, 0, 100);
    fill(tono, 100, 40);

    let x = mouseX;
    let y = mouseY;

    for (let i = 0; i < 50; i = i + 1) {
      x = x + dx;
      y = y + dy;

      circle(x, y, (50 - i) / 2);

      if (random() < 0.1) {
        dx = random(-10, 10);
        dy = random(-10, 10);
      }
    }

    if (random() < 0.02) {
      tono = random(360);
    }
  }
}