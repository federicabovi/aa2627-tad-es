// Illusione: griglia in movimento / moiré di quadrati
// Fonte: https://michaelbach.de/ot/
// Regola (consigliata): una griglia di quadrati neri si ripete su righe e colonne; le linee bianche tra un blocco e l'altro cambiano spessore in modo sinusoidale e i quadrati si leggermente spostano in fase diversa. La variazione continua del contrasto crea un effetto percettivo di vibrazione, pulsazione e movimento della superficie.
// Parametri critici: cellSize, initialLineWidth, lineAmplitude, animationSpeed
//   effetto più evidente con cellSize 80, initialLineWidth 12, lineAmplitude 10, animationSpeed 0.04; nessun effetto con lineAmplitude 0 o animationSpeed 0

const CANVAS_W = 800;
const CANVAS_H = 600;

const cellSize = 80;
const initialLineWidth = 12;
const lineAmplitude = 10;
const animationSpeed = 0.04;
const offsetStrength = 8;

function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  frameRate(30);
  rectMode(CORNER);
  noStroke();
}

function draw() {
  background(255);

  const time = frameCount * animationSpeed;
  const lineWidth = initialLineWidth + sin(time) * lineAmplitude;
  const shift = sin(time * 1.8) * offsetStrength;

  fill(0);
  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      const jitterX = sin((x + y) * 0.08 + time * 2.4) * 1.4;
      const jitterY = cos((x - y) * 0.07 + time * 1.9) * 1.4;

      rect(
        x + lineWidth / 2 + jitterX + shift * 0.2,
        y + lineWidth / 2 + jitterY + shift * 0.2,
        cellSize - lineWidth,
        cellSize - lineWidth
      );
    }
  }

  stroke(255);
  strokeWeight(lineWidth);

  for (let x = -cellSize; x <= width + cellSize; x += cellSize) {
    const driftX = sin(x * 0.08 + time) * offsetStrength;
    line(x + driftX, 0, x + driftX, height);
  }

  for (let y = -cellSize; y <= height + cellSize; y += cellSize) {
    const driftY = cos(y * 0.08 + time * 1.2) * offsetStrength;
    line(0, y + driftY, width, y + driftY);
  }

  noStroke();
}