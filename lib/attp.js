const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const canvasGif = require('canvas-gif');

async function createAttp(text, outputFilePath, fontPath) {
  if (!text) {
    throw new Error("Está faltando o texto!");
  }

  let length = text.length;
  let font = 90;

  if (length > 12) font = 68;
  if (length > 15) font = 58;
  if (length > 18) font = 55;
  if (length > 19) font = 50;
  if (length > 22) font = 48;
  if (length > 24) font = 38;
  if (length > 27) font = 35;
  if (length > 30) font = 30;
  if (length > 35) font = 26;
  if (length > 39) font = 25;
  if (length > 40) font = 20;
  if (length > 49) font = 10;

  Canvas.registerFont(fontPath, { family: 'SF-Pro' });

  const buffer = await canvasGif(
    outputFilePath,
    (ctx) => {
      const colors = ["#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      function drawStroked(text, x, y) {
        ctx.lineWidth = 5;
        ctx.font = `${font}px SF-Pro`;
        ctx.fillStyle = color;
        ctx.strokeStyle = 'black';
        ctx.textAlign = 'center';
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
      }

      drawStroked(text, 290, 300);
    },
    {
      coalesce: false,
      delay: 0,
      repeat: 0,
      algorithm: 'octree',
      optimiser: false,
      fps: 7,
      quality: 100,
    }
  );

  fs.writeFileSync(outputFilePath, buffer);
  console.log(`GIF salvo em ${outputFilePath}`);
  return outputFilePath;
}

module.exports = { createAttp };



