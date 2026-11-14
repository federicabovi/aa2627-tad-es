// Quadro: Max Bill, "Geometric Composition", 1990
// Fonte: https://www.plazzart.com/en_GB/buy/contemporary-art/max-bill-geometric-composition-1990-signed-screenprint-492924
//
// Regola cromatica:
// Regola cromatica:
// La composizione utilizza quattro colori principali: magenta, azzurro, giallo e arancione.
// I colori sono distribuiti in fasce triangolari che si irradiano da quattro punti di convergenza.
// La variazione cromatica mantiene i rapporti tra i colori della palette originale. 
// Il tono cambia attraverso l'interazione con il mouse. 
// Un clic genera un'unica variazione casuale di tonalità.

// Parametri principali

let dimensione = 600;
let margine = 0;

let palette = [];

// Gestione dell'interazione

let attesaFotogrammi = 30;
let prossimoClickFrame = 30;

// Variazione cromatica condivisa

let variazioneTono = 0;

// Limiti della variazione cromatica

let variazioneMinima = -20;
let variazioneMassima = 20;

// Palette originale HSB

let coloriOriginali = [
  [322, 82, 78],  // Magenta
  [192, 100, 78], // Azzurro
  [48, 100, 94],  // Giallo
  [16, 94, 91]    // Arancione
];


function setup() {

  createCanvas(dimensione, dimensione);

  colorMode(HSB, 360, 100, 100);

  frameRate(30);

  aggiornaPalette();

}


function draw() {

  background(0, 0, 100);

  // Gestione del cursore

  if (frameCount >= prossimoClickFrame) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  // Coordinate principali

  let x0 = margine;
  let y0 = margine;

  let x1 = dimensione - margine;
  let y1 = dimensione - margine;

  let cx = dimensione / 2;
  let cy = dimensione / 2;

  // Punti di convergenza

  let alto = [cx, y0];
  let destra = [x1, cy];
  let basso = [cx, y1];
  let sinistra = [x0, cy];

  // Quadrante superiore sinistro

  ventaglio(
    alto,
    [
      [x0, y0],
      [x0, y0 + 97.5],
      [x0, y0 + 187.5],
      sinistra,
      [cx, cy]
    ],
    [0, 1, 2, 3]
  );

  // Quadrante superiore destro

  ventaglio(
    destra,
    [
      [x1, y0],
      [x1 - 105, y0],
      [x1 - 206.25, y0],
      alto,
      [cx, cy]
    ],
    [3, 0, 1, 2]
  );

  // Quadrante inferiore destro

  ventaglio(
    basso,
    [
      [x1, y1],
      [x1, y1 - 97.5],
      [x1, y1 - 195],
      destra,
      [cx, cy]
    ],
    [2, 3, 0, 1]
  );

  // Quadrante inferiore sinistro

  ventaglio(
    sinistra,
    [
      [x0, y1],
      [x0 + 108.75, y1],
      [x0 + 210, y1],
      basso,
      [cx, cy]
    ],
    [1, 2, 3, 0]
  );

}


// Funzione per disegnare le fasce triangolari

function ventaglio(punto, confine, ordineColori) {

  for (let i = 0; i < confine.length - 1; i++) {

    let colore = palette[ordineColori[i]];

    fill(colore);

    noStroke();

    beginShape();

    vertex(punto[0], punto[1]);

    vertex(confine[i][0], confine[i][1]);

    vertex(confine[i + 1][0], confine[i + 1][1]);

    endShape(CLOSE);

  }

}


// Funzione per aggiornare la palette

function aggiornaPalette() {

  palette = [];

  for (let i = 0; i < coloriOriginali.length; i++) {

    // Applica la stessa variazione a tutti i colori

    let tono = coloriOriginali[i][0] + variazioneTono;

    let colore = color(
      tono,
      coloriOriginali[i][1],
      coloriOriginali[i][2]
    );

    palette.push(colore);

  }

}


// Interazione: clic del mouse

function mousePressed() {

  if (frameCount >= prossimoClickFrame) {

    // Genera una variazione casuale condivisa

    variazioneTono = random(
      variazioneMinima,
      variazioneMassima
    );

    aggiornaPalette();

    // Avvia il tempo di attesa

    prossimoClickFrame = frameCount + attesaFotogrammi;

  }

}