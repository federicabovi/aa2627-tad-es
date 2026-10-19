/*
Illusione: Scintillating Grid Illusion
Fonte: https://www.greenme.it/lifestyle/test/griglia-scintillante-illusione-ottica/
Regola: linee grigie orizzontali e verticali formano una griglia.
Piccoli dischi bianchi sono ripetuti alle intersezioni.
Parametri critici:
- passoGriglia: effetto più evidente con una griglia fitta; nessun effetto se gli incroci sono troppo distanti per formare una griglia percepibile.
- diametroPunto: effetto più evidente con punti piccoli; nessun effetto se i punti nascondono le linee della griglia.
- spessoreLinea: effetto più evidente con linee sottili e visibili; nessun effetto se le linee sono invisibili.
- contrastoLinee: effetto più evidente con linee chiare sul fondo nero; nessun effetto se linee e sfondo hanno lo stesso colore.
- variazione: movimento più evidente con una variazione moderata; nessuna variazione animata se vale 0.
- velocita: movimento più leggibile se lento; nessun movimento se vale 0.
*/

// Dimensioni della tela
let larghezzaTela = 800;
let altezzaTela = 600;

// Parametri della griglia
let passoGriglia = 50;
let spessoreLinea = 8;
let diametroPunto = 12;
let margine = 25;

// Parametri dell'animazione
let contrastoLinee = 110;
let variazione = 25;
let velocita = 0.035;

function setup() {
  createCanvas(larghezzaTela, altezzaTela);
  noStroke();
}

function draw() {
  background(0);

  // Variazione graduale dell'intensità delle linee
  let oscillazione = sin(frameCount * velocita);
  let grigioLinea = contrastoLinee + oscillazione * variazione;

  // Linee verticali e orizzontali
  stroke(grigioLinea);
  strokeWeight(spessoreLinea);

  for (let x = margine; x <= width - margine; x += passoGriglia) {
    line(x, margine, x, height - margine);
  }

  for (let y = margine; y <= height - margine; y += passoGriglia) {
    line(margine, y, width - margine, y);
  }

  // Punti bianchi agli incroci
  noStroke();
  fill(255);

  for (let x = margine; x <= width - margine; x += passoGriglia) {
    for (let y = margine; y <= height - margine; y += passoGriglia) {
      circle(x, y, diametroPunto);
    }
  }
}