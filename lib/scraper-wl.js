//const canvacard = require("canvacard");
const fs = require("fs");
const background = "https://telegra.ph/file/002b66543e941c622e362.jpg";
const createWelcomeCard = async (img, sender, name, outputPath) => {
  const welcomer = new canvacard.Welcomer()
    .setAvatar(img)
    .setBackground('IMAGE', background)
    .setTitulo(`${name}:${sender}`)
    .setSubtitulo("Leia as regras, para evitar banimento!")
    .setColorTitulo("#FFFFFF")
    .setColorSubtitulo("#5865f2")
    .setColorCircle("#FFFFFF")
    .setColorOverlay("#F5FFFA")
    .setOpacityOverlay(0); // Remove o overlay

  try {
    const data = await welcomer.build();
    fs.writeFileSync(outputPath, data);
    console.log(`Welcome card saved to ${outputPath}`);
  } catch (err) {
    console.error("Error creating welcome card:", err);
  }
};

module.exports = { createWelcomeCard };
