 __path = process.cwd()

var express = require('express');
var router  = express.Router();
var fs = require('fs');
const path = require('path');
const axios = require('axios')
const cheerio = require('cheerio')
const https = require('https');
const readline = require('readline');
const qs = require('qs');

//const Canvas = require('canvas');
//const canvasGif = require('canvas-gif');
//const GIFEncoder = require('gifencoder');
//const wordwrap = require('word-wrapper');
//const text2png = require('text2png');


//const GIFEncoder = require('gifencoder');
//const { createCanvas, loadImage } = require('canvas');



//*************************///

var criador = 'Frost.M4ax'

var chaveapi = 'SupraOfc'
var chaveapi = 'SupraOfc';

const AXIOS_OPTIONS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 9; ASUS_X00TD) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
  },
};


// FUNÇÃO DE LIMIT DE KEY

let requestCount = {};
let keyLimits = {};

const loadRequestData = () => {
  try {
    const data = fs.readFileSync("requestCount.json", "utf8");
    const jsonData = JSON.parse(data);
    requestCount = jsonData.requestCount || {};
    keyLimits = jsonData.keyLimits || {};
  } catch (err) {
    console.error("Erro ao ler o arquivo JSON:", err);
  }
};

const saveRequestData = () => {
  try {
    fs.writeFileSync("requestCount.json", JSON.stringify({ requestCount, keyLimits }, null, 2), "utf8");
  } catch (err) {
    console.error("Erro ao escrever no arquivo JSON:", err);
  }
};

const rateLimitMiddleware = async (req, res, next) => {
  loadRequestData();
    const apikey = req.query.apikey;
  if (!apikey) return res.json({ error: "API key não fornecida." });
  if (keyLimits.hasOwnProperty(apikey) && keyLimits[apikey].valid) {
    const limit = keyLimits[apikey].limit || 0;
    if (requestCount[apikey] && requestCount[apikey] >= limit) {
      keyLimits[apikey].valid = false; 
      saveRequestData(); 
      return res.status(429).json({ error: "Limite de requests atingido para esta API key." });
    }
    requestCount[apikey] = (requestCount[apikey] || 0) + 1;
    saveRequestData(); 
    next(); 
  } else {
    res.status(401).json({ error: "Chave de API inválida ou esgotada." });
  }
};
loadRequestData();



//*** chaves dessa api ****//
loghandler = {
  notparam: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: Apikey'
  },
  noturl: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: url'
  },

  notgcname: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: Nome do Grupo'
  },
  notgcicon: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: Foto do Grupo'
  },
  notpp: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: Foto de Perfil'
  },
  notbg: {
    status: false,
 //   criador: `${creator}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: Background.'
  },
  notmemberCount: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: Número de Participantes'
  },
  notquery: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: Pesquisa.'
  },
  notkata: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: kata'
  },
  nottext: {
    status: false,
  //  criador: `${creator}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: texto'
  },
  nottext2: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: texto2'
  },
  notnabi: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: nabi'
  },
  nottext3: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: texto3'
  },
  nottheme: {
    status: false,
 //   criador: `${creator}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: tema'
  },
  notusername: {
    status: false,
  //  criador: `${creator}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: username'
  },
  notvalue: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'Está faltando o seguinte parâmetro: valor'
  },
  invalidKey: {
    status: false,
criador: `${criador}`,
    codigo: 406,
    mensagem: 'apikey invalida!!'
  },
  invalidlink: {
    status: false,
criador: `${criador}`,
    mensagem: 'erro, talvez seu link seja inválido.'
  },
  link: {
    status: false,
criador: `${criador}`,
    mensagem: 'Esta faltando o link da pesquisa.'
  },
  invalidkata: {
    status: false,
criador: `${criador}`,
    mensagem: 'erro '
  },
  error: {
    status: false,
criador: `${criador}`,
    mensagem: '404 ERROR'
  }
}

var cookie = "HSID=A7EDzLn3kae2B1Njb;SSID=AheuwUjMojTWvA5GN;APISID=cgfXh13rQbb4zbLP/AlvlPJ2xBJBsykmS_;SAPISID=m82rJG4AC9nxQ5uG/A1FotfA_gi9pvo91C;__Secure-3PAPISID=m82rJG4AC9nxQ5uG/A1FotfA_gi9pvo91C;VISITOR_INFO1_LIVE=RgZLnZtCoPU;LOGIN_INFO=AFmmF2swRQIhAOXIXsKVou2azuz-kTsCKpbM9szRExAMUD-OwHYiuB6eAiAyPm4Ag3O9rbma7umBK-AG1zoGqyJinh4ia03csp5Nkw:QUQ3MjNmeXJ0UHFRS3dzaTNGRmlWR2FfMDRxa2NRYTFiN3lfTEdOVTc4QUlwbUI4S2dlVngxSG10N3ZqcHZwTHBKano5SkN2dDlPSkhRMUtReE42TkhYeUVWS3kyUE1jY2I1QzA1MDZBaktwd1llWU9lOWE4NWhoZV92aDkxeE9vMTNlcG1uMU9rYjhOaDZWdno2ZzN3TXl5TVNhSjNBRnJaMExrQXpoa2xzRVUteFNWZDI5S0Fn;PREF=app=desktop&f4=4000000&al=id;SID=2wezCMTUkWN3YS1VmS_DXaEU84J0pZIQdemM8Zry-uzWm8y1njBpLTOpxSfN-EaYCRSiDg.;YSC=HCowA1fmvzo;__Secure-3PSID=2wezCMTUkWN3YS1VmS_DXaEU84J0pZIQdemM8Zry-uzWm8y1dajgWzlBh9TgKapGOwuXfA.;SIDCC=AJi4QfFK0ri9fSfMjMQ4tOJNp6vOb9emETXB_nf2S05mvr2jBlmeEvlSsQSzPMuJl_V0wcbL1r8;__Secure-3PSIDCC=AJi4QfGeWHx-c4uTpU1rXCciO1p0s2fJWU07KrkZhWyD1Tqi8LyR-kHuBwHY9mViVYu1fRh2PA";

//*****//

var fs = require('fs');

var FormData = require('form-data');

var fetch = require('node-fetch');

var util = require('util');

var { spawn, exec } = require('child_process');

var { color, bgcolor } = require(__path + '/lib/color.js');

const { createWelcomeCard } = require('./../lib/scraper-wl');

//const { createAttp } = require('./../lib/attp');

//const { attpv2, attpv3, attpv4 } = require('./../lib/attp');


precisos = {
    digitarapikey: {
     //   criador : `${criador}`,
        mensage: `digite parâmetro apikey!`
    }
}

var {
  pinterest,
  BaixaMusica,
  porno,
  fetchAndConvertVideo,
  animesearch
} = require("./../lib/scraper");

var {
 happymod,
 letraMusica,
 xnxx,
} = require("./../lib/scraper")

var {
 apkmody
 } = require("./../lib/scrapper")

var {
 packfig,
} = require("./../lib/stickerpack.js")

var {
 playstoredld,
 playstoredlll,
 bingimage
} = require("./../lib/info.js")
var {
 wallpapercave,
 wallpaperscraft,
 wallpaperflare
} = require("./../lib/wallpaper.js")


var {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  play1,
  ytSearch,
  imgsearch,
  feicebook,
  instagram,
  stickerpack,
  xvideos
} = require("./../lib/utils/yt");


router.use(rateLimitMiddleware);

router.get('/cekapikey', async (req, res, next) => {
  const apikey = req.query.apikey;
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    res.json({
      status: 'Ativa',
      criador: `${criador}`,
      apikey: `${apikey}`,
      mensagem: 'APIKEY ATIVA, LIMITE: 999'
    })
  } else {
	res.sendFile(__path + '/views/key.html')
  }
})

router.get('/aleatorios/welcome', async (req, res, next) => {
  const perfil = req.query.perfil;
  const number = req.query.number;
  const name = req.query.name

  if (!perfil) {
    return res.json({ error: "Faltando o parâmetro 'perfil'" });
  }
  if (!number) {
    return res.json({ error: "Faltando o parâmetro 'number'" });
  }
  if (!name) {
    return res.json({ error: "Faltando o parâmetro 'name'" });
  }
  const outputPath = path.join(__dirname, '..', 'tmp', 'WelcomeCard.png');
  try {
    console.log(`Criando cartão de boas-vindas com perfil: ${perfil}, número: ${number}, name: ${name}`);
    await createWelcomeCard(perfil, number, name, outputPath); 
    console.log(`Cartão de boas-vindas criado em: ${outputPath}`);
    res.sendFile(outputPath);
  } catch (e) {
    console.log(e)
  }
});

router.get('/aleatorios/welcome', async (req, res, next) => {
  const perfil = req.query.perfil;
  const number = req.query.number;
  const name = req.query.name

  if (!perfil) {
    return res.json({ error: "Faltando o parâmetro 'perfil'" });
  }
  if (!number) {
    return res.json({ error: "Faltando o parâmetro 'number'" });
  }
  if (!name) {
    return res.json({ error: "Faltando o parâmetro 'name'" });
  }
  const outputPath = path.join(__dirname, '..', 'tmp', 'WelcomeCard.png'); // Assuming 'tmp' folder exists
  try {
    console.log(`Criando cartão de boas-vindas com perfil: ${perfil}, número: ${number}, name: ${name}`);
    await createWelcomeCard(perfil, number, name, outputPath); // Adjust background if needed
    console.log(`Cartão de boas-vindas criado em: ${outputPath}`);
    res.sendFile(outputPath);
  } catch (e) {
    console.log(e)
  }
});



const generateAttpGif = async (file, fontPath, fontSize, text, apikey, res) => {
  if (!apikey) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro apikey' });
  }

  if (keyLimits[apikey] && keyLimits[apikey].valid) {
    try {
      // Função para criar o GIF
      const createGif = async (text) => {
        const encoder = new GIFEncoder(512, 512);
        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(120);
        encoder.setQuality(80);
        encoder.setTransparent();

        const canvas = createCanvas(512, 512);
        const ctx = canvas.getContext('2d');

        const colors = [
          'red', 'lime', 'yellow', 'magenta', 'cyan',
          '#ff0000', '#ffe100', '#33ff00', '#00ffcc', '#0033ff', '#9500ff', '#ff00ff',
          '#00ff00', '#ff4500', '#8a2be2', '#5f9ea0', '#d2691e', '#6495ed', '#ff69b4',
          '#ffd700', '#00ced1', '#ff1493', '#4b0082', '#7cfc00', '#f08080', '#dda0dd',
          '#b0e0e6', '#ff6347', '#4682b4', '#9acd32', '#20b2aa', '#adff2f', '#f0e68c'
        ];

        for (const color of colors) {
          let image = await text2png(wordwrap(text, { width: 50 }), {
            font: `${fontSize}px ${fontPath}`, // Ajuste do fontPath conforme necessário
            color: 'white',
            strokeWidth: 2,
            strokeColor: color,
            textAlign: 'center',
            lineSpacing: 10,
            padding: 20,
            backgroundColor: 'transparent',
            output: 'dataURL'
          });
          const img = await loadImage(image);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          encoder.addFrame(ctx);
        }

        encoder.finish();
        return encoder.out.getData();
      };

      const buffer = await createGif(text);
      res.set({ 'Content-Type': 'image/gif' });
      res.send(buffer);
    } catch (error) {
      console.error('Error creating gif:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'key.html'));
  }
};

router.get("/aleatorios/attp", async (req, res) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  const file = path.join(__dirname, '..', 'tmp', 'attp.gif');
  const fontPath = './lib/font_attp/Peteroy.ttf';
  const fontSize = 60;

  if (!text) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro text' });
  }

  await generateAttpGif(file, fontPath, fontSize, text, apikey, res);
});

router.get("/aleatorios/attpv2", async (req, res) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  const file = path.join(__dirname, '..', 'tmp', 'attp.gif');
  const fontPath = './lib/font_attp/edosz.ttf';
  const fontSize = 60;

  if (!text) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro text' });
  }

  await generateAttpGif(file, fontPath, fontSize, text, apikey, res);
});

router.get("/aleatorios/attpv3", async (req, res) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  const file = path.join(__dirname, '..', 'tmp', 'attp.gif');
  const fontPath = './lib/font_attp/Minecraft.ttf';
  const fontSize = 60;

  if (!text) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro text' });
  }

  await generateAttpGif(file, fontPath, fontSize, text, apikey, res);
});

router.get("/aleatorios/attpv4", async (req, res) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  const file = path.join(__dirname, '..', 'tmp', 'attp.gif');
  const fontPath = './lib/font_attp/Roboto-Black.ttf';
  const fontSize = 60;

  if (!text) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro text' });
  }

  await generateAttpGif(file, fontPath, fontSize, text, apikey, res);
});
/*
router.get("/aleatorios/attpv5", async (req, res) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  const text = req.query.text;

  if (!text) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro text' });
  }

  const file = path.join(__dirname, '..', 'tmp', 'attp.gif');
  const length = text.length;
  let font = 60;

  if (length > 60) font = 60;
  
  Canvas.registerFont('./lib/font_attp/Zahraaa.ttf', { family: 'Zahraaa' });

  if (!apikey) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro apikey' });
  }

  if (keyLimits[apikey] && keyLimits[apikey].valid) {
    try {
      const buffer = await canvasGif(
        file,
        (ctx) => {
          const colors = [
            "#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff", // cores existentes
            "#00ff00", "#ff4500", "#8a2be2", "#5f9ea0", "#d2691e", "#6495ed", "#ff69b4", // novas cores
            "#ffd700", "#00ced1", "#ff1493", "#4b0082", "#7cfc00", "#f08080", "#dda0dd", // novas cores
            "#b0e0e6", "#ff6347", "#4682b4", "#9acd32", "#20b2aa", "#adff2f", "#f0e68c"  // novas cores
          ];
          const selectedColor = colors[Math.floor(Math.random() * colors.length)];
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpar o canvas antes de desenhar
          ctx.lineWidth = 5;
          ctx.font = `${font}px Zahraaa`;
          ctx.fillStyle = selectedColor;
          ctx.strokeStyle = 'black';
          ctx.textAlign = 'center';
          ctx.strokeText(text, 290, 300);
          ctx.fillText(text, 290, 300);
        },
        {
          coalesce: true,
          delay: 0,
          repeat: 0,
          algorithm: 'octree',
          optimiser: true,
          fps: 7,
          quality: 100,
        }
      );
      res.set({ 'Content-Type': 'image/gif' });
      res.send(buffer);
    } catch (error) {
      console.error('Error creating gif:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'key.html'));
  }
});

router.get("/aleatorios/attpv6", async (req, res) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  const text = req.query.text;

  if (!text) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro text' });
  }

  const file = path.join(__dirname, '..', 'tmp', 'attp.gif');
  const length = text.length;
  let font = 60;

  if (length > 60) font = 60;
  
  Canvas.registerFont('./lib/font_attp/Surfing-Capital.ttf', { family: 'Surfing-Capital' });

  if (!apikey) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro apikey' });
  }

  if (keyLimits[apikey] && keyLimits[apikey].valid) {
    try {
      const buffer = await canvasGif(
        file,
        (ctx) => {
          const colors = [
            "#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff", // cores existentes
            "#00ff00", "#ff4500", "#8a2be2", "#5f9ea0", "#d2691e", "#6495ed", "#ff69b4", // novas cores
            "#ffd700", "#00ced1", "#ff1493", "#4b0082", "#7cfc00", "#f08080", "#dda0dd", // novas cores
            "#b0e0e6", "#ff6347", "#4682b4", "#9acd32", "#20b2aa", "#adff2f", "#f0e68c"  // novas cores
          ];
          const selectedColor = colors[Math.floor(Math.random() * colors.length)];
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpar o canvas antes de desenhar
          ctx.lineWidth = 5;
          ctx.font = `${font}px Surfing-Capital`;
          ctx.fillStyle = selectedColor;
          ctx.strokeStyle = 'black';
          ctx.textAlign = 'center';
          ctx.strokeText(text, 290, 300);
          ctx.fillText(text, 290, 300);
        },
        {
          coalesce: true,
          delay: 0,
          repeat: 0,
          algorithm: 'octree',
          optimiser: true,
          fps: 7,
          quality: 100,
        }
      );
      res.set({ 'Content-Type': 'image/gif' });
      res.send(buffer);
    } catch (error) {
      console.error('Error creating gif:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'key.html'));
  }
});


router.get("/aleatorios/attpv7", async (req, res) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  const text = req.query.text;

  if (!text) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro text' });
  }

  const file = path.join(__dirname, '..', 'tmp', 'attp.gif');
  const length = text.length;
  let font = 60;

  if (length > 60) font = 60;
  
  Canvas.registerFont('./lib/font_attp/Peteroy-Italic.ttf', { family: 'Peteroy-Italic.ttf' });

  if (!apikey) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro apikey' });
  }

  if (keyLimits[apikey] && keyLimits[apikey].valid) {
    try {
      const buffer = await canvasGif(
        file,
        (ctx) => {
          const colors = [
            "#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff", // cores existentes
            "#00ff00", "#ff4500", "#8a2be2", "#5f9ea0", "#d2691e", "#6495ed", "#ff69b4", // novas cores
            "#ffd700", "#00ced1", "#ff1493", "#4b0082", "#7cfc00", "#f08080", "#dda0dd", // novas cores
            "#b0e0e6", "#ff6347", "#4682b4", "#9acd32", "#20b2aa", "#adff2f", "#f0e68c"  // novas cores
          ];
          const selectedColor = colors[Math.floor(Math.random() * colors.length)];
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpar o canvas antes de desenhar
          ctx.lineWidth = 5;
          ctx.font = `${font}px Peteroy-Italic.ttf`;
          ctx.fillStyle = selectedColor;
          ctx.strokeStyle = 'black';
          ctx.textAlign = 'center';
          ctx.strokeText(text, 290, 300);
          ctx.fillText(text, 290, 300);
        },
        {
          coalesce: true,
          delay: 0,
          repeat: 0,
          algorithm: 'octree',
          optimiser: true,
          fps: 7,
          quality: 100,
        }
      );
      res.set({ 'Content-Type': 'image/gif' });
      res.send(buffer);
    } catch (error) {
      console.error('Error creating gif:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'key.html'));
  }
});


router.get("/aleatorios/attpv8", async (req, res) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  const text = req.query.text;

  if (!text) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro text' });
  }

  const file = path.join(__dirname, '..', 'tmp', 'attp.gif');
  const length = text.length;
  let font = 60;

  if (length > 60) font = 60;
  
  Canvas.registerFont('./lib/font_attp/pastel-crayon.ttf', { family: 'pastel-crayon' });

  if (!apikey) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro apikey' });
  }

  if (keyLimits[apikey] && keyLimits[apikey].valid) {
    try {
      const buffer = await canvasGif(
        file,
        (ctx) => {
          const colors = [
            "#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff", // cores existentes
            "#00ff00", "#ff4500", "#8a2be2", "#5f9ea0", "#d2691e", "#6495ed", "#ff69b4", // novas cores
            "#ffd700", "#00ced1", "#ff1493", "#4b0082", "#7cfc00", "#f08080", "#dda0dd", // novas cores
            "#b0e0e6", "#ff6347", "#4682b4", "#9acd32", "#20b2aa", "#adff2f", "#f0e68c"  // novas cores
          ];
          const selectedColor = colors[Math.floor(Math.random() * colors.length)];
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpar o canvas antes de desenhar
          ctx.lineWidth = 5;
          ctx.font = `${font}px pastel-crayon`;
          ctx.fillStyle = selectedColor;
          ctx.strokeStyle = 'black';
          ctx.textAlign = 'center';
          ctx.strokeText(text, 290, 300);
          ctx.fillText(text, 290, 300);
        },
        {
          coalesce: true,
          delay: 0,
          repeat: 0,
          algorithm: 'octree',
          optimiser: true,
          fps: 7,
          quality: 100,
        }
      );
      res.set({ 'Content-Type': 'image/gif' });
      res.send(buffer);
    } catch (error) {
      console.error('Error creating gif:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'key.html'));
  }
});


router.get("/aleatorios/attpv9", async (req, res) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  const text = req.query.text;

  if (!text) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro text' });
  }

  const file = path.join(__dirname, '..', 'tmp', 'attp.gif');
  const length = text.length;
  let font = 60;

  if (length > 60) font = 60;
  
  Canvas.registerFont('./lib/font_attp/bold.ttf', { family: 'bold' });

  if (!apikey) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro apikey' });
  }

  if (keyLimits[apikey] && keyLimits[apikey].valid) {
    try {
      const buffer = await canvasGif(
        file,
        (ctx) => {
          const colors = [
            "#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff", // cores existentes
            "#00ff00", "#ff4500", "#8a2be2", "#5f9ea0", "#d2691e", "#6495ed", "#ff69b4", // novas cores
            "#ffd700", "#00ced1", "#ff1493", "#4b0082", "#7cfc00", "#f08080", "#dda0dd", // novas cores
            "#b0e0e6", "#ff6347", "#4682b4", "#9acd32", "#20b2aa", "#adff2f", "#f0e68c"  // novas cores
          ];
          const selectedColor = colors[Math.floor(Math.random() * colors.length)];
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpar o canvas antes de desenhar
          ctx.lineWidth = 5;
          ctx.font = `${font}px bold`;
          ctx.fillStyle = selectedColor;
          ctx.strokeStyle = 'black';
          ctx.textAlign = 'center';
          ctx.strokeText(text, 290, 300);
          ctx.fillText(text, 290, 300);
        },
        {
          coalesce: true,
          delay: 0,
          repeat: 0,
          algorithm: 'octree',
          optimiser: true,
          fps: 7,
          quality: 100,
        }
      );
      res.set({ 'Content-Type': 'image/gif' });
      res.send(buffer);
    } catch (error) {
      console.error('Error creating gif:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'key.html'));
  }
});


router.get("/aleatorios/attpv10", async (req, res) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  const text = req.query.text;

  if (!text) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro text' });
  }

  const file = path.join(__dirname, '..', 'tmp', 'attp.gif');
  const length = text.length;
  let font = 60;

  if (length > 60) font = 60;
  
  Canvas.registerFont('./lib/font_attp/BALLOON-DREAMS.ttf', { family: 'BALLOON-DREAMS' });

  if (!apikey) {
    return res.json({ status: false, creator: 'Frost.M4ax', message: '[!] Está faltando o parâmetro apikey' });
  }

  if (keyLimits[apikey] && keyLimits[apikey].valid) {
    try {
      const buffer = await canvasGif(
        file,
        (ctx) => {
          const colors = [
            "#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff", // cores existentes
            "#00ff00", "#ff4500", "#8a2be2", "#5f9ea0", "#d2691e", "#6495ed", "#ff69b4", // novas cores
            "#ffd700", "#00ced1", "#ff1493", "#4b0082", "#7cfc00", "#f08080", "#dda0dd", // novas cores
            "#b0e0e6", "#ff6347", "#4682b4", "#9acd32", "#20b2aa", "#adff2f", "#f0e68c"  // novas cores
          ];
          const selectedColor = colors[Math.floor(Math.random() * colors.length)];
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpar o canvas antes de desenhar
          ctx.lineWidth = 5;
          ctx.font = `${font}px BALLOON-DREAMS`;
          ctx.fillStyle = selectedColor;
          ctx.strokeStyle = 'black';
          ctx.textAlign = 'center';
          ctx.strokeText(text, 290, 300);
          ctx.fillText(text, 290, 300);
        },
        {
          coalesce: true,
          delay: 0,
          repeat: 0,
          algorithm: 'octree',
          optimiser: true,
          fps: 7,
          quality: 100,
        }
      );
      res.set({ 'Content-Type': 'image/gif' });
      res.send(buffer);
    } catch (error) {
      console.error('Error creating gif:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'key.html'));
  }
});
*/

router.get("/aleatorios/fig-naruto", async (req, res, next) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json(loghandler.notparam);
  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const randomImagePath = await getRandomSticker();
      res.sendFile(randomImagePath);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.sendFile(__path + '/views/key.html');
  }
});

router.get("/aleatorios/fig-naruto", async (req, res, next) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json(loghandler.notparam);
  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const randomImagePath = await getRandomSticker();
      res.sendFile(randomImagePath);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.sendFile(__path + '/views/key.html');
  }
});

router.get("/download/wallpapercave", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    wallpapercave(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

router.get("/download/ytsearch", async (req, res, next) => {
  const apikey = req.query.apikey;
 const query = req.query.query;
  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    ytSearch(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

router.get('/game/adivinheabandeira', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {
    var bandeira = JSON.parse(
      fs.readFileSync(__path + '/data/adivinheabandeira.json')
    )
    res
      .status(200)
      .json({
        codigo: 200,
        successo: true,
        ...bandeira[~~(Math.random() * bandeira.length)]
      })
  } else {
    res.sendFile(__path + '/views/key.html')
  }
});


router.get('/game/adivipersonagem', async (req, res, next) => {
  var Apikey = req.query.apikey
  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {
    var personagem = JSON.parse(fs.readFileSync(__path + '/data/adivinheopersonagem.json'))

    res
      .status(200)
      .json({
        codigo: 200,
        successo: true,
        ...personagem[~~(Math.random() * personagem.length)]
      })
  } else {
    res.sendFile(__path + '/views/key.html')
  }
});

router.get("/download/apkmody", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    apkmody(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

router.get("/download/packfig", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    packfig(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

router.get("/download/xnxx", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    xnxx(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

router.get("/download/pinterest", async (req, res, next) => {
  const query = req.query.query;
  if (!query) return res.json(loghandler.notquery);
  if (!apikey) return res.json(loghandler.notparam);

  if (keyLimits[apikey] && keyLimits[apikey].valid) {
    const limit = keyLimits[apikey].limit || 0;
    if (requestCount[apikey] && requestCount[apikey] >= limit) {
      keyLimits[apikey].valid = false; 
      saveRequestData(); 
      return res.status(429).json({ error: "Limite de requests atingido para esta API key." });
    }
    try {
      const result = await pinterest(query);
      requestCount[apikey] = (requestCount[apikey] || 0) + 1;
      saveRequestData();

      res.json(result);
    } catch (error) {
      res.json(error);
    }
  } else {
    res.status(401).json({ error: "Chave de API inválida ou esgotada." });
    // Status 401 indica "Unauthorized"
  }
});

router.get("/download/pinterest_vd", async (req, res, next) => {
    const url = req.query.url;
    const apikey = req.query.apikey;
    if (!url) return res.json({ error: "URL não fornecida." });
    if (!apikey) return res.json({ error: "API key não fornecida." });

    try {
        if (keyLimits.hasOwnProperty(apikey) && keyLimits[apikey] && keyLimits[apikey].valid) {
            const limit = keyLimits[apikey].limit || 0;
            if (requestCount[apikey] && requestCount[apikey] >= limit) {
                keyLimits[apikey].valid = false;
                return res.status(429).json({ error: "Limite de requests atingido para esta API key." });
            }
            const result = await fetchAndConvertVideo(url); // Espera pela função assíncrona
            requestCount[apikey] = (requestCount[apikey] || 0) + 1;
            res.json(result);
        } else {
            res.status(401).json({ error: "Chave de API inválida ou esgotada." });
        }

        // Atualiza o arquivo JSON com as alterações em keyLimits
        fs.writeFile('requestCount.json', JSON.stringify(requestCount), (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo JSON:', err);
            }
        });
    } catch (error) {
        res.json({ error: error.message });
    }
})

router.get("/pesquisa/anime", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    animesearch(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

router.get("/download/happymod", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    happymod(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

router.get("/download/sticker-pack", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    stickerpack(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

async function cekapikey(api) {
ap = await zahirr.findOne({apikey:api})
return ap;
}

router.get('/frasesdebomdia', async (req, res, next) => {
  var Apikey = req.query.apikey
  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {
    var frases = JSON.parse(fs.readFileSync(__path + '/data/frases.json'))
    res
      .status(200)
      .json({
        codigo: 200,
        successo: true,
        ...frases[~~(Math.random() * frases.length)]
      })
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/cantadas', async (req, res, next) => {
  var Apikey = req.query.apikey
  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {
    var cantadas = JSON.parse(fs.readFileSync(__path + '/data/cantadas.json'))
    res
      .status(200)
      .json({
        codigo: 200,
        successo: true,
        ...cantadas[~~(Math.random() * cantadas.length)]
      })
  } else {
res.sendFile(__path + '/views/key.html')
  }
})


router.get('/anime/amv', async (req, res, next) => {
  var Apikey = req.query.apikey
  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {
    var amv = JSON.parse(fs.readFileSync(__path + '/data/amv.json'))
    res
      .status(200)
      .json({
        codigo: 200,
        successo: true,
        ...amv[~~(Math.random() * amv.length)]
      })
  } else {
res.sendFile(__path + '/views/key.html')
  }
})


router.get('/anime/hentai', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const toukaaachan = JSON.parse(fs.readFileSync(__path + '/data/hentai.json'));
    const randtoukaaachan = toukaaachan[Math.floor(Math.random() * toukaaachan.length)];
    data = await fetch(randtoukaaachan).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/hentai.jpeg', data)
    res.sendFile(__path + '/tmp/hentai.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/wall', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const toukaachan = JSON.parse(fs.readFileSync(__path + '/data/wall.json'));
    const randtoukaachan = toukaachan[Math.floor(Math.random() * toukaachan.length)];
    data = await fetch(randtoukaachan).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/wall.jpeg', data)
    res.sendFile(__path + '/tmp/wall.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})


router.get('/anime/ahegao', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const toukaaaachan = JSON.parse(fs.readFileSync(__path + '/data/ahegao.json'));
    const randtoukaaaachan = toukaaaachan[Math.floor(Math.random() * toukaaaachan.length)];
    data = await fetch(randtoukaaaachan).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ahegao.jpeg', data)
    res.sendFile(__path + '/tmp/ahegao.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})


router.get('/anime/ass', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const teste1 = JSON.parse(fs.readFileSync(__path + '/data/ass.json'));
    const randteste1 = teste1[Math.floor(Math.random() * teste1.length)];
    data = await fetch(randteste1).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ass.jpeg', data)
 res.sendFile(__path + '/tmp/ass.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})


router.get('/anime/blowjob', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const teste2 = JSON.parse(fs.readFileSync(__path + '/data/blowjob.json'));
    const randteste2 = teste2[Math.floor(Math.random() * teste2.length)];
    data = await fetch(randteste2).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/blowjob.jpeg', data)
    res.sendFile(__path + '/tmp/blowjob.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})


router.get('/anime/cuckold', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const teste3 = JSON.parse(fs.readFileSync(__path + '/data/wall.json'));
    const randteste3 = teste3[Math.floor(Math.random() * teste3.length)];
    data = await fetch(randteste3).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/cuckold.jpeg', data)
    res.sendFile(__path + '/tmp/cuckold.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/toukachan', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const toukachan = JSON.parse(fs.readFileSync(__path + '/data/toukachan.json'));
    const randtoukachan = toukachan[Math.floor(Math.random() * toukachan.length)];
    data = await fetch(randtoukachan).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/toukachan.jpeg', data)
    res.sendFile(__path + '/tmp/toukachan.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/akira', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const akira = JSON.parse(fs.readFileSync(__path + '/data/akira.json'));
    const randakira = akira[Math.floor(Math.random() * akira.length)];
    data = await fetch(randakira).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/akira.jpeg', data)
    res.sendFile(__path + '/tmp/akira.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/itori', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const itori = JSON.parse(fs.readFileSync(__path + '/data/itori.json'));
    const randitori = itori[Math.floor(Math.random() * itori.length)];
    data = await fetch(randitori).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/itori.jpeg', data)
    res.sendFile(__path + '/tmp/itori.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kurumi', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kurumi = JSON.parse(fs.readFileSync(__path + '/data/kurumi.json'));
    const randkurumi = kurumi[Math.floor(Math.random() * kurumi.length)];
    data = await fetch(randkurumi).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kurumi.jpeg', data)
    res.sendFile(__path + '/tmp/kurumi.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})
router.get('/anime/yotsuba', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const yotsuba = JSON.parse(fs.readFileSync(__path + '/data/yotsuba.json'));
    const randyotsuba = yotsuba[Math.floor(Math.random() * yotsuba.length)];
    data = await fetch(randyotsuba).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/yotsuba.jpeg', data)
    res.sendFile(__path + '/tmp/yotsuba.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/shinomiya', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const shinomiya = JSON.parse(fs.readFileSync(__path + '/data/shinomiya.json'));
    const randshinomiya = shinomiya[Math.floor(Math.random() * shinomiya.length)];
    data = await fetch(randshinomiya).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shinomiya.jpeg', data)
    res.sendFile(__path + '/tmp/shinomiya.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/yumeko', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const yumeko = JSON.parse(fs.readFileSync(__path + '/data/yumeko.json'));
    const randyumeko = yumeko[Math.floor(Math.random() * yumeko.length)];
    data = await fetch(randyumeko).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/yumeko.jpeg', data)
    res.sendFile(__path + '/tmp/yumeko.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/waifu2', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Wai2 = JSON.parse(fs.readFileSync(__path + '/data/waifu2.json'));
    const randWai2 = Wai2[Math.floor(Math.random() * Wai2.length)];
    data = await fetch(randWai2).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/wibu2.jpeg', data)
    res.sendFile(__path + '/tmp/wibu2.jpeg');
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/waifu', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Wai = JSON.parse(fs.readFileSync(__path + '/data/waifu.json'));
    const randWai = Wai[Math.floor(Math.random() * Wai.length)];
    data = await fetch(randWai).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/wibu.jpeg', data)
    res.sendFile(__path + '/tmp/wibu.jpeg');
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/miku', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const miku = JSON.parse(fs.readFileSync(__path + '/data/miku.json'));
    const randmiku = miku[Math.floor(Math.random() * miku.length)];
    data = await fetch(randmiku).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/miku.jpeg', data)
    res.sendFile(__path + '/tmp/miku.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/loli', async (req, res, next) => {
  const Apikey = req.query.apikey;
  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Loli = JSON.parse(fs.readFileSync(__path + '/data/loli.json'))
    const randLoli = Loli[Math.floor(Math.random() * Loli.length)]
    //tansole.log(randLoli)
    data = await fetch(randLoli).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/loli.jpeg', data)
    res.sendFile(__path + '/tmp/loli.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/shota', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Shota = JSON.parse(fs.readFileSync(__path + '/data/shota.json'));
    const randShota = Shota[Math.floor(Math.random() * Shota.length)];
    data = await fetch(randShota).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/shota.jpeg', data)
    res.sendFile(__path + '/tmp/shota.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/pokemon', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const pokemon = JSON.parse(fs.readFileSync(__path + '/data/pokemon.json'));
    const randpokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
    data = await fetch(randpokemon).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/pokemon.jpeg', data)
    res.sendFile(__path + '/tmp/pokemon.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/ryujin', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const ryujin = JSON.parse(fs.readFileSync(__path + '/data/ryujin.json'));
    const randryujin = ryujin[Math.floor(Math.random() * ryujin.length)];
    data = await fetch(randryujin).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ryujin.jpeg', data)
    res.sendFile(__path + '/tmp/ryujin.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/rose', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const rose = JSON.parse(fs.readFileSync(__path + '/data/rose.json'));
    const randrose = rose[Math.floor(Math.random() * rose.length)];
    data = await fetch(randrose).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/rose.jpeg', data)
    res.sendFile(__path + '/tmp/rose.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kaori', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kaori = JSON.parse(fs.readFileSync(__path + '/data/kaori.json'));
    const randkaori = kaori[Math.floor(Math.random() * kaori.length)];
    data = await fetch(randkaori).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kaori.jpeg', data)
    res.sendFile(__path + '/tmp/kaori.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/shizuka', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const shizuka = JSON.parse(fs.readFileSync(__path + '/data/shizuka.json'));
    const randshizuka = shizuka[Math.floor(Math.random() * shizuka.length)];
    data = await fetch(randshizuka).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shizuka.jpeg', data)
    res.sendFile(__path + '/tmp/shizuka.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kaga', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kaga = JSON.parse(fs.readFileSync(__path + '/data/kaga.json'));
    const randkaga = kaga[Math.floor(Math.random() * kaga.length)];
    data = await fetch(randkaga).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kaga.jpeg', data)
    res.sendFile(__path + '/tmp/kaga.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kotori', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kotori = JSON.parse(fs.readFileSync(__path + '/data/kotori.json'));
    const randkotori = kotori[Math.floor(Math.random() * kotori.length)];
    data = await fetch(randkotori).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kotori.jpeg', data)
    res.sendFile(__path + '/tmp/kotori.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/mikasa', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const mikasa = JSON.parse(fs.readFileSync(__path + '/data/mikasa.json'));
    const randmikasa = mikasa[Math.floor(Math.random() * mikasa.length)];
    data = await fetch(randmikasa).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/mikasa.jpeg', data)
    res.sendFile(__path + '/tmp/mikasa.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/akiyama', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const akiyama = JSON.parse(fs.readFileSync(__path + '/data/akiyama.json'));
    const randakiyama = akiyama[Math.floor(Math.random() * akiyama.length)];
    data = await fetch(randakiyama).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/akiyama.jpeg', data)
    res.sendFile(__path + '/tmp/akiyama.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/gremory', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const gremory = JSON.parse(fs.readFileSync(__path + '/data/gremory.json'));
    const randgremory = gremory[Math.floor(Math.random() * gremory.length)];
    data = await fetch(randgremory).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/gremory.jpeg', data)
    res.sendFile(__path + '/tmp/gremory.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/isuzu', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const isuzu = JSON.parse(fs.readFileSync(__path + '/data/isuzu.json'));
    const randisuzu = isuzu[Math.floor(Math.random() * isuzu.length)];
    data = await fetch(randisuzu).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/isuzu.jpeg', data)
    res.sendFile(__path + '/tmp/isuzu.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/cosplay', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const cosplay = JSON.parse(fs.readFileSync(__path + '/data/cosplay.json'));
    const randcosplay = cosplay[Math.floor(Math.random() * cosplay.length)];
    data = await fetch(randcosplay).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/cosplay.jpeg', data)
    res.sendFile(__path + '/tmp/cosplay.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/shina', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const shina = JSON.parse(fs.readFileSync(__path + '/data/shina.json'));
    const randshina = shina[Math.floor(Math.random() * shina.length)];
    data = await fetch(randshina).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shina.jpeg', data)
    res.sendFile(__path + '/tmp/shina.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kagura', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kagura = JSON.parse(fs.readFileSync(__path + '/data/kagura.json'));
    const randkagura = kagura[Math.floor(Math.random() * kagura.length)];
    data = await fetch(randkagura).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kagura.jpeg', data)
    res.sendFile(__path + '/tmp/kagura.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/shinka', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const shinka = JSON.parse(fs.readFileSync(__path + '/data/shinka.json'));
    const randshinka = shinka[Math.floor(Math.random() * shinka.length)];
    data = await fetch(randshinka).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shinka.jpeg', data)
    res.sendFile(__path + '/tmp/shinka.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/eba', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const eba = JSON.parse(fs.readFileSync(__path + '/data/eba.json'));
    const randeba = eba[Math.floor(Math.random() * eba.length)];
    data = await fetch(randeba).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/eba.jpeg', data)
    res.sendFile(__path + '/tmp/eba.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/deidara', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Deidara = JSON.parse(fs.readFileSync(__path + '/data/deidara.json'));
    const randDeidara = Deidara[Math.floor(Math.random() * Deidara.length)];
    data = await fetch(randDeidara).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/deidara.jpeg', data)
    res.sendFile(__path + '/tmp/deidara.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})



router.get('/anime/jeni', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const jeni = JSON.parse(fs.readFileSync(__path + '/data/jeni.json'));
    const randjeni = jeni[Math.floor(Math.random() * jeni.length)];
    data = await fetch(randjeni).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/jeni.jpeg', data)
    res.sendFile(__path + '/tmp/jeni.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})


router.get('/pesquisa/imgsearch', async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;
  if (!query) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
      imgsearch(query)
      .then((result) => {
        res.json({
          status: true,
          codigo: 200,
        //  criador: `${creator}`,
          result
        })
      })
      .catch((e) => {
        res.json(e)
      });
  } else {
    res.sendFile(__path + '/views/key.html')
  }
});

router.get('/pesquisa/xvideos', async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;
  if (!query) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
      xvideos(query)
      .then((result) => {
        res.json({
          status: true,
          codigo: 200,
        //  criador: `${creator}`,
          result
        })
      })
      .catch((e) => {
        res.json(e)
      });
  } else {
    res.sendFile(__path + '/views/key.html')
  }
});

router.get('/download/BaixaMusica', async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;
  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
      BaixaMusica(query)
      .then((result) => {
        res.json({
          status: true,
          codigo: 200,
        //  criador: `${creator}`,
          result
        })
      })
      .catch((e) => {
        res.json(e)
      });
  } else {
    res.sendFile(__path + '/views/key.html')
  }
});

router.get('/downloader/xnxx', async (req, res, next) => {
  //const apikey = req.query.apikey;
const query = req.query.query;

  const apikey = req.query.apikey;
  if (!query) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    xnxxsearch(query)
  .then((resultado) => {
        res.json({
          status: true,
          codigo: 200,
       //   criador: `${creator}`,
          resultado
        })
      })
      .catch(e => {
        res.json(loghandler.error)
      })
  } else {
res.sendFile(__path + '/views/key.html')
  }
})

router.get('/download/instagram', async (req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    instagram(url)
      .then((result) => {
        res.json({
          status: true,
          codigo: 200,
       //   criador: `${creator}`,
          result
        })
      })
      .catch((error) => {
        console.log(error)
        res.json(error)
      });
  } else {
    res.sendFile(__path + '/views/key.html')
  }
});


router.get('/download/feicebook', async (req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    feicebook(url)
      .then((result) => {
        res.json({
          status: true,
          codigo: 200,
       //   criador: `${creator}`,
          result
        })
      })
      .catch((error) => {
        console.log(error)
        res.json(error)
      });
  } else {
    res.sendFile(__path + '/views/key.html')
  }
});

router.get('/download/ytmp3', async (req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if (!url) return res.json(loghandler.link)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    ytDonlodMp3(url)
      .then((resultado) => {
        res.json({
          status: true,
          codigo: 200,
       //   criador: `${creator}`,
          resultado
        })
      })
      .catch((error) => {
        console.log(error)
        res.json(error)
      });
  } else {
    res.sendFile(__path + '/views/key.html')
  }
});

router.get('/download/ytmp4', async (req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;

  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    ytDonlodMp4(url)
      .then((resultado) => {
        res.json({
          status: true,
          codigo: 200,
        //  criador: `${creator}`,
          resultado
        })
      })
      .catch((error) => {
        res.json(error)
      });
  } else {
    res.sendFile(__path + '/views/key.html')
  }
});

router.get("/download/playaudio", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    ytPlayMp3(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

router.get("/download/play1", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    play1(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

router.get("/download/playvideo", async (req, res, next) => {

  const query = req.query.query;

  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(apikey)) {
    ytPlayMp4(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    	res.sendFile(__path + '/views/key.html')
  }
});

router.get('/anime/toukachan', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const toukachan = JSON.parse(fs.readFileSync(__path + '/data/toukachan.json'));
    const randtoukachan = toukachan[Math.floor(Math.random() * toukachan.length)];
    data = await fetch(randtoukachan).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/toukachan.jpeg', data)
    res.sendFile(__path + '/tmp/toukachan.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/akira', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const akira = JSON.parse(fs.readFileSync(__path + '/data/akira.json'));
    const randakira = akira[Math.floor(Math.random() * akira.length)];
    data = await fetch(randakira).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/akira.jpeg', data)
    res.sendFile(__path + '/tmp/akira.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/itori', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const itori = JSON.parse(fs.readFileSync(__path + '/data/itori.json'));
    const randitori = itori[Math.floor(Math.random() * itori.length)];
    data = await fetch(randitori).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/itori.jpeg', data)
    res.sendFile(__path + '/tmp/itori.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kurumi', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kurumi = JSON.parse(fs.readFileSync(__path + '/data/kurumi.json'));
    const randkurumi = kurumi[Math.floor(Math.random() * kurumi.length)];
    data = await fetch(randkurumi).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kurumi.jpeg', data)
    res.sendFile(__path + '/tmp/kurumi.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/miku', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const miku = JSON.parse(fs.readFileSync(__path + '/data/miku.json'));
    const randmiku = miku[Math.floor(Math.random() * miku.length)];
    data = await fetch(randmiku).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/miku.jpeg', data)
    res.sendFile(__path + '/tmp/miku.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/pokemon', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const pokemon = JSON.parse(fs.readFileSync(__path + '/data/pokemon.json'));
    const randpokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
    data = await fetch(randpokemon).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/pokemon.jpeg', data)
    res.sendFile(__path + '/tmp/pokemon.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/ryujin', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const ryujin = JSON.parse(fs.readFileSync(__path + '/data/ryujin.json'));
    const randryujin = ryujin[Math.floor(Math.random() * ryujin.length)];
    data = await fetch(randryujin).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ryujin.jpeg', data)
    res.sendFile(__path + '/tmp/ryujin.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/rose', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const rose = JSON.parse(fs.readFileSync(__path + '/data/rose.json'));
    const randrose = rose[Math.floor(Math.random() * rose.length)];
    data = await fetch(randrose).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/rose.jpeg', data)
    res.sendFile(__path + '/tmp/rose.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kaori', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kaori = JSON.parse(fs.readFileSync(__path + '/data/kaori.json'));
    const randkaori = kaori[Math.floor(Math.random() * kaori.length)];
    data = await fetch(randkaori).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kaori.jpeg', data)
    res.sendFile(__path + '/tmp/kaori.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/shizuka', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const shizuka = JSON.parse(fs.readFileSync(__path + '/data/shizuka.json'));
    const randshizuka = shizuka[Math.floor(Math.random() * shizuka.length)];
    data = await fetch(randshizuka).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shizuka.jpeg', data)
    res.sendFile(__path + '/tmp/shizuka.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kaga', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kaga = JSON.parse(fs.readFileSync(__path + '/data/kaga.json'));
    const randkaga = kaga[Math.floor(Math.random() * kaga.length)];
    data = await fetch(randkaga).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kaga.jpeg', data)
    res.sendFile(__path + '/tmp/kaga.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kotori', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kotori = JSON.parse(fs.readFileSync(__path + '/data/kotori.json'));
    const randkotori = kotori[Math.floor(Math.random() * kotori.length)];
    data = await fetch(randkotori).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kotori.jpeg', data)
    res.sendFile(__path + '/tmp/kotori.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/mikasa', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const mikasa = JSON.parse(fs.readFileSync(__path + '/data/mikasa.json'));
    const randmikasa = mikasa[Math.floor(Math.random() * mikasa.length)];
    data = await fetch(randmikasa).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/mikasa.jpeg', data)
    res.sendFile(__path + '/tmp/mikasa.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/akiyama', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const akiyama = JSON.parse(fs.readFileSync(__path + '/data/akiyama.json'));
    const randakiyama = akiyama[Math.floor(Math.random() * akiyama.length)];
    data = await fetch(randakiyama).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/akiyama.jpeg', data)
    res.sendFile(__path + '/tmp/akiyama.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/gremory', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const gremory = JSON.parse(fs.readFileSync(__path + '/data/gremory.json'));
    const randgremory = gremory[Math.floor(Math.random() * gremory.length)];
    data = await fetch(randgremory).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/gremory.jpeg', data)
    res.sendFile(__path + '/tmp/gremory.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/isuzu', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const isuzu = JSON.parse(fs.readFileSync(__path + '/data/isuzu.json'));
    const randisuzu = isuzu[Math.floor(Math.random() * isuzu.length)];
    data = await fetch(randisuzu).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/isuzu.jpeg', data)
    res.sendFile(__path + '/tmp/isuzu.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/cosplay', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const cosplay = JSON.parse(fs.readFileSync(__path + '/data/cosplay.json'));
    const randcosplay = cosplay[Math.floor(Math.random() * cosplay.length)];
    data = await fetch(randcosplay).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/cosplay.jpeg', data)
    res.sendFile(__path + '/tmp/cosplay.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/shina', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const shina = JSON.parse(fs.readFileSync(__path + '/data/shina.json'));
    const randshina = shina[Math.floor(Math.random() * shina.length)];
    data = await fetch(randshina).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shina.jpeg', data)
    res.sendFile(__path + '/tmp/shina.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kagura', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kagura = JSON.parse(fs.readFileSync(__path + '/data/kagura.json'));
    const randkagura = kagura[Math.floor(Math.random() * kagura.length)];
    data = await fetch(randkagura).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kagura.jpeg', data)
    res.sendFile(__path + '/tmp/kagura.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/shinka', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const shinka = JSON.parse(fs.readFileSync(__path + '/data/shinka.json'));
    const randshinka = shinka[Math.floor(Math.random() * shinka.length)];
    data = await fetch(randshinka).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shinka.jpeg', data)
    res.sendFile(__path + '/tmp/shinka.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/eba', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const eba = JSON.parse(fs.readFileSync(__path + '/data/eba.json'));
    const randeba = eba[Math.floor(Math.random() * eba.length)];
    data = await fetch(randeba).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/eba.jpeg', data)
    res.sendFile(__path + '/tmp/eba.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/deidara', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Deidara = JSON.parse(fs.readFileSync(__path + '/data/deidara.json'));
    const randDeidara = Deidara[Math.floor(Math.random() * Deidara.length)];
    data = await fetch(randDeidara).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/deidara.jpeg', data)
    res.sendFile(__path + '/tmp/deidara.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/jeni', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const jeni = JSON.parse(fs.readFileSync(__path + '/data/jeni.json'));
    const randjeni = jeni[Math.floor(Math.random() * jeni.length)];
    data = await fetch(randjeni).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/jeni.jpeg', data)
    res.sendFile(__path + '/tmp/jeni.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})


router.get('/random/meme', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const meme = JSON.parse(fs.readFileSync(__path + '/data/meme.json'));
    const randmeme = meme[Math.floor(Math.random() * meme.length)];
    data = await fetch(randmeme).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/meme.jpeg', data)
    res.sendFile(__path + '/tmp/meme.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/wallpaper/satanic', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const satanic = JSON.parse(fs.readFileSync(__path + '/data/satanic.json'));
    const randsatanic = satanic[Math.floor(Math.random() * satanic.length)];
    data = await fetch(randsatanic).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/satanic.jpeg', data)
    res.sendFile(__path + '/tmp/satanic.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})



router.get('/anime/itachi', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Itachi = JSON.parse(fs.readFileSync(__path + '/data/itachi.json'));
    const randItachi = Itachi[Math.floor(Math.random() * Itachi.length)];
    data = await fetch(randItachi).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ita.jpeg', data)
    res.sendFile(__path + '/tmp/ita.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/madara', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Madara = JSON.parse(fs.readFileSync(__path + '/data/madara.json'));
    const randMadara = Madara[Math.floor(Math.random() * Madara.length)];
    data = await fetch(randMadara).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/madara.jpeg', data)
    res.sendFile(__path + '/tmp/madara.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/yuki', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Yuki = JSON.parse(fs.readFileSync(__path + '/data/yuki.json'));
    const randYuki = Yuki[Math.floor(Math.random() * Yuki.length)];
    data = await fetch(randYuki).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/yuki.jpeg', data)
    res.sendFile(__path + '/tmp/yuki.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/wallpaper/asuna', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const asuna = JSON.parse(fs.readFileSync(__path + '/data/asuna.json'));
    const randasuna = asuna[Math.floor(Math.random() * asuna.length)];
    data = await fetch(randasuna).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/asuna.jpeg', data)
    res.sendFile(__path + '/tmp/asuna.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/ayuzawa', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const ayuzawa = JSON.parse(fs.readFileSync(__path + '/data/ayuzawa.json'));
    const randayuzawa = ayuzawa[Math.floor(Math.random() * ayuzawa.length)];
    data = await fetch(randayuzawa).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ayuzawa.jpeg', data)
    res.sendFile(__path + '/tmp/ayuzawa.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/chitoge', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const chitoge = JSON.parse(fs.readFileSync(__path + '/data/chitoge.json'));
    const randchitoge = chitoge[Math.floor(Math.random() * chitoge.length)];
    data = await fetch(randchitoge).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/chitoge.jpeg', data)
    res.sendFile(__path + '/tmp/chitoge.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/emilia', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const emilia = JSON.parse(fs.readFileSync(__path + '/data/emilia.json'));
    const randemilia = emilia[Math.floor(Math.random() * emilia.length)];
    data = await fetch(randemilia).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/emilia.jpeg', data)
    res.sendFile(__path + '/tmp/emilia.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/hestia', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const hestia = JSON.parse(fs.readFileSync(__path + '/data/hestia.json'));
    const randhestia = hestia[Math.floor(Math.random() * hestia.length)];
    data = await fetch(randhestia).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/hestia.jpeg', data)
    res.sendFile(__path + '/tmp/hestia.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/inori', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const inori = JSON.parse(fs.readFileSync(__path + '/data/inori.json'));
    const randinori = inori[Math.floor(Math.random() * inori.length)];
    data = await fetch(randinori).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/inori.jpeg', data)
    res.sendFile(__path + '/tmp/inori.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/ana', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const ana = JSON.parse(fs.readFileSync(__path + '/data/ana.json'));
    const randana = ana[Math.floor(Math.random() * ana.length)];
    data = await fetch(randana).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ana.jpeg', data)
    res.sendFile(__path + '/tmp/ana.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/boruto', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Boruto = JSON.parse(fs.readFileSync(__path + '/data/boruto.json'));
    const randBoruto = Boruto[Math.floor(Math.random() * Boruto.length)];
    data = await fetch(randBoruto).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/bor.jpeg', data)
    res.sendFile(__path + '/tmp/bor.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/erza', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Erza = JSON.parse(fs.readFileSync(__path + '/data/erza.json'));
    const randErza = Erza[Math.floor(Math.random() * Erza.length)];
    data = await fetch(randErza).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/erza.jpeg', data)
    res.sendFile(__path + '/tmp/erza.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kakasih', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Kakasih = JSON.parse(fs.readFileSync(__path + '/data/kakasih.json'));
    const randKakasih = Kakasih[Math.floor(Math.random() * Kakasih.length)];
    data = await fetch(randKakasih).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ka.jpeg', data)
    res.sendFile(__path + '/tmp/ka.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/sagiri', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Sagiri = JSON.parse(fs.readFileSync(__path + '/data/sagiri.json'));
    const randSagiri = Sagiri[Math.floor(Math.random() * Sagiri.length)];
    data = await fetch(randSagiri).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/sagiri.jpeg', data)
    res.sendFile(__path + '/tmp/sagiri.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/minato', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Minato = JSON.parse(fs.readFileSync(__path + '/data/minato.json'));
    const randMinato = Minato[Math.floor(Math.random() * Minato.length)];
    data = await fetch(randMinato).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/minato.jpeg', data)
    res.sendFile(__path + '/tmp/minato.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/naruto', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Naruto = JSON.parse(fs.readFileSync(__path + '/data/naruto.json'));
    const randNaruto = Naruto[Math.floor(Math.random() * Naruto.length)];
    data = await fetch(randNaruto).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/naruto.jpeg', data)
    res.sendFile(__path + '/tmp/naruto.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/nezuko', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Nezuko = JSON.parse(fs.readFileSync(__path + '/data/nezuko.json'));
    const randNezuko = Nezuko[Math.floor(Math.random() * Nezuko.length)];
    data = await fetch(randNezuko).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/nezu.jpeg', data)
    res.sendFile(__path + '/tmp/nezu.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/onepiece', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Pic = JSON.parse(fs.readFileSync(__path + '/data/onepiece.json'));
    const randPic = Pic[Math.floor(Math.random() * Pic.length)];
    data = await fetch(randPic).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/pic.jpeg', data)
    res.sendFile(__path + '/tmp/pic.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/rize', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Rize = JSON.parse(fs.readFileSync(__path + '/data/rize.json'));
    const randRize = Rize[Math.floor(Math.random() * Rize.length)];
    data = await fetch(randRize).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/rize.jpeg', data)
    res.sendFile(__path + '/tmp/rize.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/sakura', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Sakura = JSON.parse(fs.readFileSync(__path + '/data/sakura.json'));
    const randSakura = Sakura[Math.floor(Math.random() * Sakura.length)];
    data = await fetch(randSakura).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/sakura.jpeg', data)
    res.sendFile(__path + '/tmp/sakura.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/sasuke', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Sasuke = JSON.parse(fs.readFileSync(__path + '/data/sasuke.json'));
    const randSasuke = Sasuke[Math.floor(Math.random() * Sasuke.length)];
    data = await fetch(randSasuke).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/sasuke.jpeg', data)
    res.sendFile(__path + '/tmp/sasuke.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/tsunade', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Su = JSON.parse(fs.readFileSync(__path + '/data/tsunade.json'));
    const randSu = Su[Math.floor(Math.random() * Su.length)];
    data = await fetch(randSu).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/su.jpeg', data)
    res.sendFile(__path + '/tmp/su.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/montor', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Mon = JSON.parse(fs.readFileSync(__path + '/data/montor.json'));
    const randMon = Mon[Math.floor(Math.random() * Mon.length)];
    data = await fetch(randMon).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/montor.jpeg', data)
    res.sendFile(__path + '/tmp/montor.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/mobil', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Mob = JSON.parse(fs.readFileSync(__path + '/data/mobil.json'));
    const randMob = Mob[Math.floor(Math.random() * Mob.length)];
    data = await fetch(randMob).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/mobil.jpeg', data)
    res.sendFile(__path + '/tmp/mobil.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/anime', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Wai23 = JSON.parse(fs.readFileSync(__path + '/data/wallhp2.json'));
    const randWai23 = Wai23[Math.floor(Math.random() * Wai23.length)];
    data = await fetch(randWai23).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/wallhp2.jpeg', data)
    res.sendFile(__path + '/tmp/wallhp2.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/waifu2', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Wai2 = JSON.parse(fs.readFileSync(__path + '/data/waifu2.json'));
    const randWai2 = Wai2[Math.floor(Math.random() * Wai2.length)];
    data = await fetch(randWai2).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/wibu2.jpeg', data)
    res.sendFile(__path + '/tmp/wibu2.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/waifu', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Wai = JSON.parse(fs.readFileSync(__path + '/data/waifu.json'));
    const randWai = Wai[Math.floor(Math.random() * Wai.length)];
    data = await fetch(randWai).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/wibu.jpeg', data)
    res.sendFile(__path + '/tmp/wibu.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})


router.get('/anime/hekel', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    Hekel = JSON.parse(fs.readFileSync(__path + '/data/hekel.json'));
    const randHekel = Hekel[Math.floor(Math.random() * Hekel.length)]
    data = await fetch(randHekel).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/hek.jpeg', data)
    res.sendFile(__path + '/tmp/hek.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/kucing', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    Kucing = JSON.parse(fs.readFileSync(__path + '/data/kucing.json'));
    const randKucing = Kucing[Math.floor(Math.random() * Kucing.length)]
    data = await fetch(randKucing).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kucing.jpeg', data)
    res.sendFile(__path + '/tmp/kucing.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/wallpaper/pubg', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    Pubg = JSON.parse(fs.readFileSync(__path + '/data/pubg.json'));
    const randPubg = Pubg[Math.floor(Math.random() * Pubg.length)]
    data = await fetch(randPubg).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/pubg.jpeg', data)
    res.sendFile(__path + '/tmp/pubg.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/wallpaper/ppcouple', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    Pp = JSON.parse(fs.readFileSync(__path + '/data/profil.json'));
    const randPp = Pp[Math.floor(Math.random() * Pp.length)]
    data = await fetch(randPp).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/pp.jpeg', data)
    res.sendFile(__path + '/tmp/pp.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/wallpaper/anjing', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    Anjing = JSON.parse(fs.readFileSync(__path + '/data/anjing.json'));
    const randAnjing = Anjing[Math.floor(Math.random() * Anjing.length)]
    data = await fetch(randAnjing).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ajg.jpeg', data)
    res.sendFile(__path + '/tmp/ajg.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/doraemon', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    Dora = JSON.parse(fs.readFileSync(__path + '/data/doraemon.json'));
    const randDora = Dora[Math.floor(Math.random() * Dora.length)]
    data = await fetch(randDora).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/dora.jpeg', data)
    res.sendFile(__path + '/tmp/dora.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})


router.get('/anime/elaina', async (req, res, next) => {
  const Apikey = req.query.apikey;
  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Elaina = JSON.parse(fs.readFileSync(__path + '/data/elaina.json'))
    const randElaina = Elaina[Math.floor(Math.random() * Elaina.length)]
    //tansole.log(randLoli)
    data = await fetch(randElaina).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/elaina.jpeg', data)
    res.sendFile(__path + '/tmp/elaina.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})


router.get('/anime/loli', async (req, res, next) => {
  const Apikey = req.query.apikey;
  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Loli = JSON.parse(fs.readFileSync(__path + '/data/loli.json'))
    const randLoli = Loli[Math.floor(Math.random() * Loli.length)]
    //tansole.log(randLoli)
    data = await fetch(randLoli).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/loli.jpeg', data)
    res.sendFile(__path + '/tmp/loli.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})


router.get('/anime/yuri', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const teste5 = JSON.parse(fs.readFileSync(__path + '/data/yuri.json'));
    const randteste5 = teste5[Math.floor(Math.random() * teste5.length)];
    data = await fetch(randteste5).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/yuri.jpeg', data)
    res.sendFile(__path + '/tmp/yuri.jpeg')
  } else {
res.sendFile(__path + '/views/key.html')
  }
})



router.get('/anime/cecan', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const cecan = JSON.parse(fs.readFileSync(__path + '/data/cecan.json'));
    const randCecan = cecan[Math.floor(Math.random() * cecan.length)];
    data = await fetch(randCecan).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/cecan.jpeg', data)
    res.sendFile(__path + '/tmp/cecan.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})


router.get('/wallpaper/aesthetic', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Aesthetic = JSON.parse(fs.readFileSync(__path + '/data/aesthetic.json'));
    const randAesthetic = Aesthetic[Math.floor(Math.random() * Aesthetic.length)];
    data = await fetch(randAesthetic).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/aesthetic.jpeg', data)
    res.sendFile(__path + '/tmp/aesthetic.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/sagiri', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Sagiri = JSON.parse(fs.readFileSync(__path + '/data/sagiri.json'));
    const randSagiri = Sagiri[Math.floor(Math.random() * Sagiri.length)];
    data = await fetch(randSagiri).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/sagiri.jpeg', data)
    res.sendFile(__path + '/tmp/sagiri.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/shota', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Shota = JSON.parse(fs.readFileSync(__path + '/data/shota.json'));
    const randShota = Shota[Math.floor(Math.random() * Shota.length)];
    data = await fetch(randShota).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/shota.jpeg', data)
    res.sendFile(__path + '/tmp/shota.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/nsfwloli', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Lol = JSON.parse(fs.readFileSync(__path + '/data/nsfwloli.json'));
    const randLol = Lol[Math.floor(Math.random() * Lol.length)];
    data = await fetch(randLol).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/lol.jpeg', data)
    res.sendFile(__path + '/tmp/lol.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/hinata', async (req, res, next) => {
  var Apikey = req.query.apikey
  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {
    const Hinata = JSON.parse(fs.readFileSync(__path + '/data/hinata.json'));
    const randHin = Hinata[Math.floor(Math.random() * Hinata.length)];
    data = await fetch(randHin).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/Hinata.jpeg', data)
    res.sendFile(__path + '/tmp/Hinata.jpeg');
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/keneki', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const keneki = JSON.parse(fs.readFileSync(__path + '/data/keneki.json'));
    const randkeneki = keneki[Math.floor(Math.random() * keneki.length)];
    data = await fetch(randkeneki).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/keneki.jpeg', data)
    res.sendFile(__path + '/tmp/keneki.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/megumin', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const megumin = JSON.parse(fs.readFileSync(__path + '/data/megumin.json'));
    const randmegumin = megumin[Math.floor(Math.random() * megumin.length)];
    data = await fetch(randmegumin).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/megumin.jpeg', data)
    res.sendFile(__path + '/tmp/megumin.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/yotsuba', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (listkey.includes(Apikey)) {

    const yotsuba = JSON.parse(fs.readFileSync(__path + '/data/yotsuba.json'));
    const randyotsuba = yotsuba[Math.floor(Math.random() * yotsuba.length)];
    data = await fetch(randyotsuba).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/yotsuba.jpeg', data)
    res.sendFile(__path + '/tmp/yotsuba.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/shinomiya', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const shinomiya = JSON.parse(fs.readFileSync(__path + '/data/shinomiya.json'));
    const randshinomiya = shinomiya[Math.floor(Math.random() * shinomiya.length)];
    data = await fetch(randshinomiya).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shinomiya.jpeg', data)
    res.sendFile(__path + '/tmp/shinomiya.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/yumeko', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const yumeko = JSON.parse(fs.readFileSync(__path + '/data/yumeko.json'));
    const randyumeko = yumeko[Math.floor(Math.random() * yumeko.length)];
    data = await fetch(randyumeko).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/yumeko.jpeg', data)
    res.sendFile(__path + '/tmp/yumeko.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/tejina', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const tejina = JSON.parse(fs.readFileSync(__path + '/data/tejina.json'));
    const randtejina = tejina[Math.floor(Math.random() * tejina.length)];
    data = await fetch(randtejina).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/tejina.jpeg', data)
    res.sendFile(__path + '/tmp/tejina.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/chiho', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const chiho = JSON.parse(fs.readFileSync(__path + '/data/chiho.json'));
    const randchiho = chiho[Math.floor(Math.random() * chiho.length)];
    data = await fetch(randchiho).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/chiho.jpeg', data)
    res.sendFile(__path + '/tmp/chiho.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/toukachan', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const toukachan = JSON.parse(fs.readFileSync(__path + '/data/toukachan.json'));
    const randtoukachan = toukachan[Math.floor(Math.random() * toukachan.length)];
    data = await fetch(randtoukachan).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/toukachan.jpeg', data)
    res.sendFile(__path + '/tmp/toukachan.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')}
})

router.get('/anime/akira', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const akira = JSON.parse(fs.readFileSync(__path + '/data/akira.json'));
    const randakira = akira[Math.floor(Math.random() * akira.length)];
    data = await fetch(randakira).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/akira.jpeg', data)
    res.sendFile(__path + '/tmp/akira.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/itori', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const itori = JSON.parse(fs.readFileSync(__path + '/data/itori.json'));
    const randitori = itori[Math.floor(Math.random() * itori.length)];
    data = await fetch(randitori).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/itori.jpeg', data)
    res.sendFile(__path + '/tmp/itori.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/kurumi', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kurumi = JSON.parse(fs.readFileSync(__path + '/data/kurumi.json'));
    const randkurumi = kurumi[Math.floor(Math.random() * kurumi.length)];
    data = await fetch(randkurumi).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kurumi.jpeg', data)
    res.sendFile(__path + '/tmp/kurumi.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/miku', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const miku = JSON.parse(fs.readFileSync(__path + '/data/miku.json'));
    const randmiku = miku[Math.floor(Math.random() * miku.length)];
    data = await fetch(randmiku).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/miku.jpeg', data)
    res.sendFile(__path + '/tmp/miku.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/pokemon', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const pokemon = JSON.parse(fs.readFileSync(__path + '/data/pokemon.json'));
    const randpokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
    data = await fetch(randpokemon).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/pokemon.jpeg', data)
    res.sendFile(__path + '/tmp/pokemon.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/ryujin', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const ryujin = JSON.parse(fs.readFileSync(__path + '/data/ryujin.json'));
    const randryujin = ryujin[Math.floor(Math.random() * ryujin.length)];
    data = await fetch(randryujin).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ryujin.jpeg', data)
    res.sendFile(__path + '/tmp/ryujin.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/rose', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const rose = JSON.parse(fs.readFileSync(__path + '/data/rose.json'));
    const randrose = rose[Math.floor(Math.random() * rose.length)];
    data = await fetch(randrose).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/rose.jpeg', data)
    res.sendFile(__path + '/tmp/rose.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/kaori', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kaori = JSON.parse(fs.readFileSync(__path + '/data/kaori.json'));
    const randkaori = kaori[Math.floor(Math.random() * kaori.length)];
    data = await fetch(randkaori).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kaori.jpeg', data)
    res.sendFile(__path + '/tmp/kaori.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/shizuka', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const shizuka = JSON.parse(fs.readFileSync(__path + '/data/shizuka.json'));
    const randshizuka = shizuka[Math.floor(Math.random() * shizuka.length)];
    data = await fetch(randshizuka).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shizuka.jpeg', data)
    res.sendFile(__path + '/tmp/shizuka.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/kaga', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kaga = JSON.parse(fs.readFileSync(__path + '/data/kaga.json'));
    const randkaga = kaga[Math.floor(Math.random() * kaga.length)];
    data = await fetch(randkaga).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kaga.jpeg', data)
    res.sendFile(__path + '/tmp/kaga.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/kotori', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kotori = JSON.parse(fs.readFileSync(__path + '/data/kotori.json'));
    const randkotori = kotori[Math.floor(Math.random() * kotori.length)];
    data = await fetch(randkotori).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kotori.jpeg', data)
    res.sendFile(__path + '/tmp/kotori.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/mikasa', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const mikasa = JSON.parse(fs.readFileSync(__path + '/data/mikasa.json'));
    const randmikasa = mikasa[Math.floor(Math.random() * mikasa.length)];
    data = await fetch(randmikasa).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/mikasa.jpeg', data)
    res.sendFile(__path + '/tmp/mikasa.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/akiyama', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const akiyama = JSON.parse(fs.readFileSync(__path + '/data/akiyama.json'));
    const randakiyama = akiyama[Math.floor(Math.random() * akiyama.length)];
    data = await fetch(randakiyama).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/akiyama.jpeg', data)
    res.sendFile(__path + '/tmp/akiyama.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/gremory', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const gremory = JSON.parse(fs.readFileSync(__path + '/data/gremory.json'));
    const randgremory = gremory[Math.floor(Math.random() * gremory.length)];
    data = await fetch(randgremory).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/gremory.jpeg', data)
    res.sendFile(__path + '/tmp/gremory.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/isuzu', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const isuzu = JSON.parse(fs.readFileSync(__path + '/data/isuzu.json'));
    const randisuzu = isuzu[Math.floor(Math.random() * isuzu.length)];
    data = await fetch(randisuzu).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/isuzu.jpeg', data)
    res.sendFile(__path + '/tmp/isuzu.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/cosplay', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const cosplay = JSON.parse(fs.readFileSync(__path + '/data/cosplay.json'));
    const randcosplay = cosplay[Math.floor(Math.random() * cosplay.length)];
    data = await fetch(randcosplay).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/cosplay.jpeg', data)
    res.sendFile(__path + '/tmp/cosplay.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/shina', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const shina = JSON.parse(fs.readFileSync(__path + '/data/shina.json'));
    const randshina = shina[Math.floor(Math.random() * shina.length)];
    data = await fetch(randshina).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shina.jpeg', data)
    res.sendFile(__path + '/tmp/shina.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/kagura', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kagura = JSON.parse(fs.readFileSync(__path + '/data/kagura.json'));
    const randkagura = kagura[Math.floor(Math.random() * kagura.length)];
    data = await fetch(randkagura).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kagura.jpeg', data)
    res.sendFile(__path + '/tmp/kagura.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/shinka', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(Apikey)) {

    const shinka = JSON.parse(fs.readFileSync(__path + '/data/shinka.json'));
    const randshinka = shinka[Math.floor(Math.random() * shinka.length)];
    data = await fetch(randshinka).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/shinka.jpeg', data)
    res.sendFile(__path + '/tmp/shinka.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/eba', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const eba = JSON.parse(fs.readFileSync(__path + '/data/eba.json'));
    const randeba = eba[Math.floor(Math.random() * eba.length)];
    data = await fetch(randeba).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/eba.jpeg', data)
    res.sendFile(__path + '/tmp/eba.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/deidara', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const Deidara = JSON.parse(fs.readFileSync(__path + '/data/deidara.json'));
    const randDeidara = Deidara[Math.floor(Math.random() * Deidara.length)];
    data = await fetch(randDeidara).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/deidara.jpeg', data)
    res.sendFile(__path + '/tmp/deidara.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/jeni', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const jeni = JSON.parse(fs.readFileSync(__path + '/data/jeni.json'));
    const randjeni = jeni[Math.floor(Math.random() * jeni.length)];
    data = await fetch(randjeni).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/jeni.jpeg', data)
    res.sendFile(__path + '/tmp/jeni.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})


router.get('/anime/bdsm', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const bdsm = JSON.parse(fs.readFileSync(__path + '/data/bdsm.json'));
    const randbdsm = bdsm[Math.floor(Math.random() * bdsm.length)];
    data = await fetch(randbdsm).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/bdsm.jpeg', data)
    res.sendFile(__path + '/tmp/bdsm.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/blowjob', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const blowjob = JSON.parse(fs.readFileSync(__path + '/data/blowjob.json'));
    const randblowjob = blowjob[Math.floor(Math.random() * blowjob.length)];
    data = await fetch(randblowjob).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/blowjob.jpeg', data)
    res.sendFile(__path + '/tmp/blowjob.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/nsfw/ero', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const ero = JSON.parse(fs.readFileSync(__path + '/data/ero.json'));
    const randero = ero[Math.floor(Math.random() * ero.length)];
    data = await fetch(randero).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/ero.jpeg', data)
    res.sendFile(__path + '/tmp/ero.jpeg')
  } else {
    res.json(loghandler.invalidKey)
  }
})


router.get('/anime/cum', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const cum = JSON.parse(fs.readFileSync(__path + '/data/cum.json'));
    const randcum = cum[Math.floor(Math.random() * cum.length)];
    data = await fetch(randcum).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/cum.jpeg', data)
    res.sendFile(__path + '/tmp/cum.jpeg')
} else {
    res.sendFile(__path + '/views/key.html')
}
})

router.get('/anime/kasedaiki', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const kasedaikiData = JSON.parse(fs.readFileSync(__path + '/data/kasedaiki.json'));
    const randKasedaikiData = kasedaikiData[Math.floor(Math.random() * kasedaikiData.length)];
    data = await fetch(randKasedaikiData).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/kasedaiki.jpeg', data)
    res.sendFile(__path + '/tmp/kasedaiki.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime/femdom', async (req, res, next) => {
  var Apikey = req.query.apikey

  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.hasOwnProperty(Apikey)) {

    const femdomData = JSON.parse(fs.readFileSync(__path + '/data/femdom.json'));
    const randFemdomData = femdomData[Math.floor(Math.random() * femdomData.length)];
    data = await fetch(randFemdomData).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/femdom.jpeg', data)
    res.sendFile(__path + '/tmp/femdom.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
  
  
})

router.get('/news/g1', rateLimitMiddleware, async (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json(loghandler.notparam);
  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const url_g1 = 'https://g1.globo.com/';
      const response = await axios.get(url_g1); // Adicionei await aqui
      const $ = cheerio.load(response.data);

      const newsTitles = [];
      $('.feed-post-link').each((index, element) => {
        const title = $(element).text().trim();
        newsTitles.push(title);
      });

      const numNewsToShow = 7;
      const newsToShow = newsTitles.slice(0, numNewsToShow).map(title => `📰 ${title}`);

      res.json({ news: newsToShow });
    } catch (error) {
      console.error('Erro ao raspar o G1:', error.message);
      res.status(500).json({ error: 'Erro ao obter notícias do G1' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
})

router.get('/pesquisa/movie', async (req, res) => {
  const apikey = req.query.apikey;
  const query = req.query.query;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!query) return res.json({ status: false, message: '[!] Está faltando o parâmetro query' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const url = `https://observatoriodocinema.uol.com.br/?s=${encodeURIComponent(query)}`;

      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const articles = $('article.feed');
      let results = [];

      articles.each((index, element) => {
        const article = $(element);
        const title = article.find('h2.post-title-feed-lg').text().trim();
        const link = article.find('a.feed-link').attr('href');
        const image = article.find('img').attr('src');
        const description = article.find('p.feed-excert').text().trim();

        results.push({
          title,
          link,
          image,
          description
        });
      });

      res.json({ results });
    } catch (error) {
      console.error('Erro ao fazer o scraping:', error);
      res.status(500).json({ error: 'Erro ao obter dados do site' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

router.get('/news/aeroin', async (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const url_aviao = 'https://aeroin.net/';
      const { data: data_aviao } = await axios.get(url_aviao);
      const $ = cheerio.load(data_aviao);

      const noticias_aviao = [];

      $('.td_module_flex').each((index, element) => {
        const titulo_aviao = $(element).find('.entry-title').text().trim();
        const link_aviao = $(element).find('.entry-title a').attr('href');
        const imagem_aviao = $(element).find('.td-module-thumb .entry-thumb').attr('data-img-url');
        const data_publicacao_aviao = $(element).find('.td-post-date time').attr('datetime');

        noticias_aviao.push({
          titulo_aviao,
          link_aviao,
          imagem_aviao,
          data_publicacao_aviao
        });
      });

      res.json({ noticias: noticias_aviao });
    } catch (error) {
      console.error(`Erro ao acessar o site: ${error.message}`);
      res.status(500).json({ error: 'Erro ao obter dados do site' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

router.get('/download/pinterest_dl', async (req, res) => {
  const apikey = req.query.apikey;
  let url = req.query.url;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!url) return res.json({ status: false, message: '[!] Está faltando o parâmetro url' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      if (url.includes('https://pin.it/')) {
        console.log('Extracting original pin link');
        const shortUrlResponse = await axios.get(url);
        if (shortUrlResponse.status !== 200) {
          console.log('Entered URL is invalid or not working.');
          return res.status(400).json({ error: 'Entered URL is invalid or not working.' });
        }

        const $ = cheerio.load(shortUrlResponse.data);
        const hrefLink = $('link[rel="alternate"]').attr('href');
        const match = hrefLink.match(/url=(.*?)&/);
        url = match[1];
      }
      const body = await axios.get(url);
      if (body.status !== 200) {
        console.log('Entered URL is invalid or not working.');
        return res.status(400).json({ error: 'Entered URL is invalid or not working.' });
      }

      const $ = cheerio.load(body.data);

      const extractUrl = $('video.hwa.kVc.MIw.L4E').attr('src');
      if (!extractUrl) {
        console.log('Video URL not found on the page.');
        return res.status(404).json({ error: 'Video URL not found on the page.' });
      }

      const convertUrl = extractUrl.replace('hls', '720p').replace('m3u8', 'mp4');
      res.json({ videoUrl: convertUrl });
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});



router.get('/news/globo', async (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const { data } = await axios.get('https://g1.globo.com/');
      const $ = cheerio.load(data);
      let noticias = [];

      $('.feed-post-link').each((index, element) => {
        const titulo = $(element).text().trim();
        const url = $(element).attr('href');
        noticias.push({ titulo, url });
      });

      let mensagem = '📰 *Últimas notícias do Globo*:\n\n';
      noticias.slice(0, 10).forEach((noticia, index) => {
        mensagem += `📍 *${index + 1}. ${noticia.titulo}*\n🔗 ${noticia.url}\n\n`;
      });

      res.json({ message: mensagem });
    } catch (error) {
      console.error(`Erro ao acessar o site: ${error.message}`);
      res.status(500).json({ error: 'Erro ao obter dados do site' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});



router.get('/news/tecnologia', async (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const url = 'https://tecnoblog.net/';
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      const articles = [];
      let count = 0;
      const maxArticles = 10;

      $('.grid4').each((index, element) => {
        if (count >= maxArticles) return false;

        const article = $(element).find('.bloco.article-destaque');
        const title = article.find('h2').text().trim();
        const category = article.find('.spread .cat.catname').first().text().trim();
        const comments = article.find('.spread .cat.catname.comments').text().trim();
        const datetime = article.find('.info time').attr('datetime');
        const time = article.find('.info time').text().trim();
        const authorInfo = article.find('.info').text().split(' por ');
        const author = authorInfo.length > 1 ? authorInfo[1].trim() : 'Desconhecido';

        articles.push({
          notícia: title || 'Noticia não encontrada',
          category: category || 'Categoria não encontrada',
          comments: comments || '0',
          datetime: datetime || 'Data não encontrada',
          time: time || 'Hora não encontrada',
          author: author
        });

        count++;
      });

      res.json({ articles });
    } catch (error) {
      console.error(`Erro ao acessar o site: ${error.message}`);
      res.status(500).json({ error: 'Erro ao obter dados do site' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

router.get('/news/cbf-', async (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      // Função para extrair notícias de uma URL específica
      async function fetchNews(url) {
        try {
          const { data } = await axios.get(url);
          const $ = cheerio.load(data);

          const newsList = [];

          $('div.news').each((index, element) => {
            const title = $(element).find('h2.news-title a').text().trim();
            const description = $(element).find('p.news-desc a').text().trim();
            const link = $(element).find('h2.news-title a').attr('href');
            const date = $(element).find('span.text-1').text().trim();

            newsList.push({
              title,
              description,
              link: `https://www.cbf.com.br${link}`,
              date
            });
          });

          return newsList;
        } catch (error) {
          console.error(`Error fetching news: ${error}`);
          return [];
        }
      }

      // URL base
      const baseUrl = 'https://www.cbf.com.br/futebol-brasileiro/noticias/';
      // Parâmetro para escolher a competição (Série A ou Série B)
      const competition = 'campeonato-brasileiro-serie-a'; // Pode ser alterado para 'campeonato-brasileiro-serie-a'
      // URL completa
      const url = `${baseUrl}${competition}`;

      const newsList = await fetchNews(url);

      res.json({ noticias: newsList });
    } catch (error) {
      console.error(`Erro ao acessar o site: ${error.message}`);
      res.status(500).json({ error: 'Erro ao obter dados do site' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});


router.get('/news/cbf', async (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      // Função para extrair notícias de uma URL específica
      async function fetchNews(url) {
        try {
          const { data } = await axios.get(url);
          const $ = cheerio.load(data);

          const newsList = [];

          $('div.news').each((index, element) => {
            const title = $(element).find('h2.news-title a').text().trim();
            const description = $(element).find('p.news-desc a').text().trim();
            const link = $(element).find('h2.news-title a').attr('href');
            const date = $(element).find('span.text-1').text().trim();

            newsList.push({
              title,
              description,
              link: `https://www.cbf.com.br${link}`,
              date
            });
          });

          return newsList;
        } catch (error) {
          console.error(`Error fetching news: ${error}`);
          return [];
        }
      }

      // URL base
      const baseUrl = 'https://www.cbf.com.br/futebol-brasileiro/noticias/';
      // Parâmetro para escolher a competição (Série A ou Série B)
      const competition = 'campeonato-brasileiro-serie-b'; // Pode ser alterado para 'campeonato-brasileiro-serie-a'
      // URL completa
      const url = `${baseUrl}${competition}`;

      const newsList = await fetchNews(url);

      res.json({ noticias: newsList });
    } catch (error) {
      console.error(`Erro ao acessar o site: ${error.message}`);
      res.status(500).json({ error: 'Erro ao obter dados do site' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

router.get('/pesquisa/game-search', async (req, res) => {
  const apikey = req.query.apikey;
  const query = req.query.query;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!query) return res.json({ status: false, message: '[!] Está faltando o parâmetro query' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const url = `https://www.adrenaline.com.br/produto/games/${query}/`;

      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Extrair características do produto
      const characteristics = {};
      $('.product-characteristics-list .label-aspects').each((i, element) => {
        const label = $(element).find('.label-aspects-title').text().trim().replace(':', '');
        const value = $(element).contents().filter(function () {
          return this.nodeType === 3; // Text node
        }).text().trim();
        characteristics[label] = value;
      });

      // Extrair descrição do produto
      const description = $('.product-description .section-text').text().trim();

      if (Object.keys(characteristics).length === 0 && !description) {
        return res.json({ status: false, message: `❌ Não foram encontradas informações para o jogo *${query}*.` });
      }

      // Formatando e exibindo os dados
      let output = `🎮 *Características do jogo: ${query}*\n\n`;
      for (const [label, value] of Object.entries(characteristics)) {
        output += `📝 *${label}:* ${value}\n`;
      }

      output += '\n📜 *Descrição do jogo:*\n';
      output += description;

      res.json({ status: true, data: output });
    } catch (error) {
      console.error(`Erro ao acessar o site: ${error.message}`);
      res.status(500).json({ status: false, message: `❌ Não foram encontradas informações para o jogo *${query}*.` });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

router.get('/pesquisa/playlist', async (req, res) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!query) return res.json({ status: false, message: '[!] Está faltando o parâmetro query' });
  
  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      // URL da página de busca das playlists de academia
      const url = `https://playlistspotify.com.br/playlists/${query}`

      // Fazendo requisição HTTP para a página
      const { data } = await axios.get(url);

      // Carregando o HTML retornado no cheerio
      const $ = cheerio.load(data);

      // Array para armazenar as playlists encontradas
      let playlists = [];

      // Selecionando e extraindo as informações das playlists
      $('a').each((i, elem) => {
        const linkSite = $(elem).attr('href');
        const imgSrc = $(elem).find('img').attr('src');
        const altText = $(elem).find('img').attr('alt');

        // Verificando se o link e o texto alt existem
        if (linkSite && imgSrc && altText) {
          playlists.push({
            titulo: altText.trim(),
            linkSite: linkSite,
            imgSrc: imgSrc
          });
        }
      });

      // Para cada playlist encontrada, acessa a página específica para extrair o link do Spotify
      for (let playlist of playlists) {
        const playlistPage = await axios.get(playlist.linkSite);
        const $playlistPage = cheerio.load(playlistPage.data);

        const spotifyLink = $playlistPage('a[href*="open.spotify.com"]').attr('href');
        playlist.linkSpotify = spotifyLink || 'Link do Spotify não encontrado';
      }

      res.json({ status: true, playlists });
    } catch (error) {
      console.error(`Erro ao buscar playlists: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar playlists' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

router.get('/download/tiktok', async (req, res) => {
  const apikey = req.query.apikey;
  const url = req.query.url;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!url) return res.json({ status: false, message: '[!] Está faltando o parâmetro url' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const clean = (data) => {
        let regex = /(<([^>]+)>)/gi;
        data = data.replace(/(<br?\s?\/>)/gi, " \n");
        return data.replace(regex, "");
      };

      const shortener = async (url) => url;

      const fetchTiktokData = async (url) => {
        const response = await axios.post("https://lovetik.com/api/ajax/search", new URLSearchParams({ query: url }));
        const result = {};

        result.creator = ".";
        result.title = clean(response.data.desc);
        result.author = clean(response.data.author);
        result.nowm = await shortener((response.data.links[0].a || "").replace("https", "http"));
        result.watermark = await shortener((response.data.links[1].a || "").replace("https", "http"));
        result.audio = await shortener((response.data.links[2].a || "").replace("https", "http"));
        result.thumbnail = await shortener(response.data.cover);
        return result;
      };

      const tiktokData = await fetchTiktokData(url);

      res.json({ status: true, data: tiktokData });
    } catch (error) {
      console.error(`Erro ao buscar informações do TikTok: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar informações do TikTok' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});


router.get('/download/instagram', async (req, res) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
const instagramGetUrl = require('instagram-url-direct');

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!url) return res.json({ status: false, message: '[!] Está faltando o parâmetro url' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const links = await instagramGetUrl(url);
      res.json({ status: true, links });
    } catch (error) {
      console.error(`Erro ao obter URL do Instagram: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao obter URL do Instagram' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

router.get('/download/instagram_2', async (req, res) => {
  const apikey = req.query.apikey;
  const url = req.query.url;

  if (!apikey) {
    return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  }
  if (!url) {
    return res.json({ status: false, message: '[!] Está faltando o parâmetro url' });
  }

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const instagramGetUrl = async (url_media) => {
        const BASE_URL = 'https://www.instagram.com/p/';
        const postId = url_media
          .replace(' ', '')
          .split('/')
          .filter((x) => x.length > 0)[3];

        const config = {
          method: 'get',
          url: `${BASE_URL}${postId}/?__a=1`, // Simplifiquei a URL para obter dados do post
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52'
          },
        };

        try {
          const response = await axios(config);
          const result = response.data.graphql.shortcode_media;

          if (result) {
            if (result.is_video) {
              return result.video_url;
            } else {
              return result.display_url;
            }
          } else {
            throw new Error('Erro ao obter dados do post do Instagram');
          }
        } catch (error) {
          throw new Error(`Erro ao fazer requisição para o Instagram: ${error.message}`);
        }
      };

      const link = await instagramGetUrl(url);
      res.json({ status: true, Instagram_2: true, link });
    } catch (error) {
      console.error(`Erro ao obter URL do Instagram: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao obter URL do Instagram' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

const { ephoto } = require('nayan-server');

// Função auxiliar para lidar com erros e enviar respostas
const handleRequest = async (url, texts, res) => {
    try {
        // Obtemos a resposta da API
        const response = await ephoto(url, texts);
        
        // Extrai apenas o parâmetro `url` da resposta
        if (response && response.url) {
            res.json({ status: true, imageUrl: response.url });
        } else {
            res.json({ status: false, message: '[!] URL da imagem não encontrada' });
        }
    } catch (err) {
        res.json({ status: false, message: '[!] Ocorreu um erro ao criar a imagem', error: err.message });
    }
};

router.get('/logos/deadpool', async (req, res) => {
    const text1 = req.query.text1;
    const text2 = req.query.text2;
    const apikey = req.query.apikey;

    if (!text1 || !text2) {
        return res.json({ status: false, message: '[!] Parâmetros de texto ausentes' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/create-text-effects-in-the-style-of-the-deadpool-logo-818.html';
        handleRequest(url, [text1, text2], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

router.get('/logos/comic-style', async (req, res) => {
    const text1 = req.query.text1;
    const apikey = req.query.apikey;

    if (!text1) {
        return res.json({ status: false, message: '[!] Parâmetro de texto ausente' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html';
        handleRequest(url, [text1], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

router.get('/logos/dragon-ball', async (req, res) => {
    const text1 = req.query.text1;
    const apikey = req.query.apikey;

    if (!text1) {
        return res.json({ status: false, message: '[!] Parâmetro de texto ausente' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html';
        handleRequest(url, [text1], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

router.get('/logos/silver', async (req, res) => {
    const text1 = req.query.text1;
    const apikey = req.query.apikey;

    if (!text1) {
        return res.json({ status: false, message: '[!] Parâmetro de texto ausente' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html';
        handleRequest(url, [text1], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

router.get('/logos/neon-light', async (req, res) => {
    const text1 = req.query.text1;
    const apikey = req.query.apikey;

    if (!text1) {
        return res.json({ status: false, message: '[!] Parâmetro de texto ausente' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html';
        handleRequest(url, [text1], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

router.get('/logos/glitch', async (req, res) => {
    const text1 = req.query.text1;
    const apikey = req.query.apikey;

    if (!text1) {
        return res.json({ status: false, message: '[!] Parâmetro de texto ausente' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html';
        handleRequest(url, [text1], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

router.get('/logos/naruto', async (req, res) => {
    const text1 = req.query.text1;
    const apikey = req.query.apikey;

    if (!text1) {
        return res.json({ status: false, message: '[!] Parâmetro de texto ausente' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html';
        handleRequest(url, [text1], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

router.get('/logos/metallic', async (req, res) => {
    const text1 = req.query.text1;
    const text2 = req.query.text2;
    const apikey = req.query.apikey;

    if (!text1 || !text2) {
        return res.json({ status: false, message: '[!] Parâmetros de texto ausentes' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/create-metallic-cover-online-297.html';
        handleRequest(url, [text1, text2], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

// Rota para efeito "Capitão América"
router.get('/logos/capitao-america', async (req, res) => {
    const text1 = req.query.text1;
    const text2 = req.query.text2;
    const apikey = req.query.apikey;

    if (!text1 || !text2) {
        return res.json({ status: false, message: '[!] Parâmetros de texto ausentes' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/create-a-cinematic-captain-america-text-effect-online-715.html';
        handleRequest(url, [text1, text2], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

// Rota para efeito "Thunder"
router.get('/logos/thunder', async (req, res) => {
    const text1 = req.query.text1;
    const apikey = req.query.apikey;

    if (!text1) {
        return res.json({ status: false, message: '[!] Parâmetro de texto ausente' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/thunder-text-effect-online-97.html';
        handleRequest(url, [text1], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

// Rota para efeito "Nigeria"
router.get('/logos/nigeria', async (req, res) => {
    const text1 = req.query.text1;
    const apikey = req.query.apikey;

    if (!text1) {
        return res.json({ status: false, message: '[!] Parâmetro de texto ausente' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html';
        handleRequest(url, [text1], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

// Rota para efeito "Graffiti"
router.get('/logos/graffiti', async (req, res) => {
    const text1 = req.query.text1;
    const apikey = req.query.apikey;

    if (!text1) {
        return res.json({ status: false, message: '[!] Parâmetro de texto ausente' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/graffiti-text-5-180.html';
        handleRequest(url, [text1], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

// Rota para efeito "Word-green"
router.get('/logos/word-green', async (req, res) => {
    const text1 = req.query.text1;
    const apikey = req.query.apikey;

    if (!text1) {
        return res.json({ status: false, message: '[!] Parâmetro de texto ausente' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/create-unique-word-green-light-63.html';
        handleRequest(url, [text1], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

// Rota para efeito "Tiktok-text"
router.get('/logos/tiktok-text', async (req, res) => {
    const text1 = req.query.text1;
    const text2 = req.query.text2;
    const apikey = req.query.apikey;

    if (!text1 || !text2) {
        return res.json({ status: false, message: '[!] Parâmetros de texto ausentes' });
    }
    if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

    if (keyLimits.hasOwnProperty(apikey)) {
        keyLimits[apikey]--;

        if (keyLimits[apikey] <= 0) {
            delete keyLimits[apikey];
            return res.json({ status: false, message: 'Limite de uso da chave excedido' });
        }

        const url = 'https://en.ephoto360.com/tik-tok-text-effects-online-generator-485.html';
        handleRequest(url, [text1, text2], res);
    } else {
        res.sendFile(__path + '/views/key.html');
    }
});

router.get('/pesquisa/playstore', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ status: false, message: 'Parâmetro "query" é necessário' });

  try {
    const response = await axios.get(`https://play.google.com/store/search?q=${query}&c=apps`, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
      }
    });

    const $ = cheerio.load(response.data);
    const dados = [];

    $('.VfPpkd-aGsRMb').each((i, e) => {
      const thumbApp = $(e).find('img:first').attr('srcset') 
        ? ($(e).find('img:first').attr('srcset').split(' ')[0]) 
        : $(e).find('img:last').attr('src');

      dados.push({
        aplicativo: $(e).find('.DdYX5:first').text(),
        thumbApp: thumbApp,
        desenvolvedor: $(e).find('.wMUdtb:first').text(),
        estrelas: $(e).find('.w2kbF:first').text(),
        linkApp: 'https://play.google.com' + $(e).find('a:first').attr('href')
      });
    });

    res.json({ status: response.status, resultado: dados });
  } catch (error) {
    console.error('Erro ao buscar aplicativos:', error.message);
    res.status(500).json({ status: false, message: 'Erro ao buscar aplicativos' });
  }
});

router.get('/pesquisa/amazon', async (req, res) => {
  const apikey = req.query.apikey;
  const query = req.query.query;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!query) return res.json({ status: false, message: '[!] Está faltando o parâmetro query' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const encodeUrl = (query) => encodeURIComponent(query);

      const amazonSearch = async (query) => {
        return new Promise((resolve, reject) => {
          axios.get(`https://www.amazon.com.br/s?k=${encodeUrl(query)}&ref=nb_sb_noss`, {
            headers: {
              "user-agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36"
            }
          })
          .then((res) => {
            const dados = [];
            const $ = cheerio.load(res.data);
            $('div[data-component-type="s-search-result"]').each((i, e) => {
              dados.push({
                titulo: $(e).find('span[class="a-size-small a-color-base a-text-normal"]').text(),
                preco: $(e).find('span[class="a-offscreen"]:first').text(),
                imagem: $(e).find('img.s-image').attr('src'),
                link: 'https://www.amazon.com.br' + $(e).find('a:first').attr('href')
              });
            });
            resolve({ status: res.status, autor: '+55 94 9147-2796', resultado: dados });
          })
          .catch(e => reject(e));
        });
      };

      const amazonData = await amazonSearch(query);
      res.json({ status: true, data: amazonData });
    } catch (error) {
      console.error(`Erro ao buscar informações da Amazon: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar informações da Amazon' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

router.get('/videos/pornhub', async (req, res) => {
  const apikey = req.query.apikey;
  const nome = req.query.nome;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!nome) return res.json({ status: false, message: '[!] Está faltando o parâmetro nome' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const pornhub = async (nome) => {
        return new Promise((resolve, reject) => {
          axios.get(`https://pt.pornhub.com/video/search?search=${nome}`)
            .then(tod => {
              const $ = cheerio.load(tod.data);
              const postagem = [];

              $("li.pcVideoListItem.js-pop.videoblock.videoBox").each((_, say) => {
                const titulo = $(say).find("a").attr('title');
                const link = $(say).find("a").attr('href');
                const img = $(say).find("img").attr('data-thumb_url');
                const duracao = $(say).find("var.duration").text().trim();
                const qualidade = $(say).find("span.hd-thumbnail").text().trim();
                const autor = $(say).find("div.usernameWrap").text().trim();
                const visualizacoes = $(say).find("span.views").text().trim();
                const dataUpload = $(say).find("var.added").text().trim();
                const hype = $(say).find("div.value").text().trim();
                const linkCompleto = `https://pt.pornhub.com${link}`;
                
                const resultado = {
                  titulo: titulo,
                  img: img,
                  duracao: duracao,
                  qualidade: qualidade,
                  autor: autor,
                  visualizacoes: visualizacoes,
                  dataUpload: dataUpload,
                  hype: hype,
                  link: linkCompleto
                };
                
                postagem.push(resultado);
              });

              resolve(postagem);
            })
            .catch(reject);
        });
      };

      const videos = await pornhub(nome);
      res.json({ status: true, data: videos });
    } catch (error) {
      console.error(`Erro ao buscar vídeos: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar vídeos' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

router.get('/videos/xvideos', async (req, res) => {
  const apikey = req.query.apikey;
  const nome = req.query.nome;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!nome) return res.json({ status: false, message: '[!] Está faltando o parâmetro nome' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const xvideos = async (nome) => {
        return new Promise((resolve, reject) => {
          axios.get(`https://xvideosporno.blog.br/?s=${nome}`)
            .then(tod => {
              const $ = cheerio.load(tod.data);
              const postagem = [];

              $("div.postbox").each((_, say) => {
                const titulo = $(say).find("a").attr('title');
                const link = $(say).find("a").attr('href');
                const img = $(say).find("img").attr('src');
                const duracao = $(say).find("time.duration-top").text().trim();
                const qualidade = $(say).find("b.hd-top").text().trim();

                const resultado = {
                  titulo: titulo,
                  img: img,
                  duracao: duracao,
                  qualidade: qualidade,
                  link: link
                };

                postagem.push(resultado);
              });

              resolve(postagem);
            })
            .catch(reject);
        });
      };

      const videos = await xvideos(nome);
      res.json({ status: true, data: videos });
    } catch (error) {
      console.error(`Erro ao buscar vídeos: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar vídeos' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});


//const express = require('express');
const request = require('request');
//const router = express.Router();

router.get('/xvideoss', async (req, res) => {
  const apikey = req.query.apikey;
  const nome = req.query.nome;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!nome) return res.json({ status: false, message: '[!] Está faltando o parâmetro nome' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const xvideoss = async (nome) => {
        return new Promise((resolve, reject) => {
          const link = `https://www.xvideos.com/?k=${nome}`;
          const data = [];
          const xv = [];

          request(link, (err, req, body) => {
            if (err) return reject(err);

            const Sayo_Reg = /<\/div><div class=\".+?\"><p class=\".+?\"><a href=\".+?\" .+? <span class=\".+?\"><\/span>/g;
            const datas = body.match(Sayo_Reg);
            if (datas) data.push(...datas);

            const Sayo_Regk = /\"\/.+?\"/g;
            const Sayo_Regkk = /title=\".+?\">/g;

            for (let index of data) {
              const paulo_R = index.match(Sayo_Regk);
              const paulo_RR = index.match(Sayo_Regkk);
              const paulo_RRR = paulo_RR[0].split('title=').join('').split('>').join('');

              const opções = {
                título: JSON.parse(paulo_RRR),
                link: 'https://www.xvideos.com' + JSON.parse(paulo_R[0]),
              };

              xv.push(opções);
            }

            resolve(xv);
          });
        });
      };

      const videos = await xvideoss(nome);
      res.json({ status: true, data: videos });
    } catch (error) {
      console.error(`Erro ao buscar vídeos: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar vídeos' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

 const obterRespostaSimi = async (texto) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resposta = {};
      let config = {
        url: "https://api.simsimi.vn/v2/simtalk",
        method: "post",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({ text: texto, lc: 'pt' })
      };

      await axios(config).then((simiresposta) => {
        resposta.resultado = simiresposta.data.message;
        resolve(resposta);
      }).catch((err) => {
        if (err.response?.data?.message) {
          resposta.resultado = err.response.data.message;
          resolve(resposta);
        } else {
          resposta.erro = "Houve um erro no servidor do SimSimi.";
          reject(resposta);
        }
      });
    } catch (err) {
      console.log(`API obterRespostaSimi - ${err.message}`);
      reject({ erro: "Houve um erro no servidor do SimSimi." });
    }
  });
};

// Rota para obter resposta do SimSimi
router.get('/simsimi', async (req, res) => {
  const apikey = req.query.apikey;
  const texto = req.query.texto;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });
  if (!texto) return res.json({ status: false, message: '[!] Está faltando o parâmetro texto' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const resposta = await obterRespostaSimi(texto);
      res.json({ status: true, data: resposta });
    } catch (error) {
      console.error(`Erro ao obter resposta do SimSimi: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao obter resposta do SimSimi' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

router.get('/grupos/whatsapp', async (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const gpwhatsapp = async () => {
        return new Promise((resolve, reject) => {
          axios.get(`https://gruposwhats.app/`)
            .then(tod => {
              const $ = cheerio.load(tod.data);
              const postagem = [];

              $("div.col-12.col-md-6.col-lg-4.mb-4.col-group").each((_, say) => {
                const nome = $(say).find("h5.card-title").text().trim();
                const descricao = $(say).find("p.card-text").text().trim();
                const link = $(say).find("a.btn.btn-success.btn-block.stretched-link.font-weight-bold").attr('href');
                const img = $(say).find("img.card-img-top.lazy").attr('data-src');

                const resultado = {
                  nome: nome,
                  link: link,
                  descricao: descricao,
                  img: img
                };

                postagem.push(resultado);
              });

              resolve(postagem);
            })
            .catch(reject);
        });
      };

      const grupos = await gpwhatsapp();
      res.json({ status: true, data: grupos });
    } catch (error) {
      console.error(`Erro ao buscar grupos: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar grupos' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

const getRandomSticker = (folderName) => {
  const stickersDir = path.join(__dirname, 'sticker', folderName);
  const stickers = fs.readdirSync(stickersDir).filter(file => file.endsWith('.webp'));
  if (stickers.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * stickers.length);
  return stickers[randomIndex];
};


router.get('/sticker/figurinha-tonko', (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const randomSticker = getRandomSticker('figurinha-tonko');
      if (randomSticker) {
     //   decrementKeyUsage(apikey); // Diminuir uso da chave
        const stickerPath = path.join(__dirname, 'sticker', 'figurinha-tonko', randomSticker);
        res.sendFile(stickerPath);
      } else {
        res.status(404).json({ status: false, message: 'Nenhuma figurinha encontrada em figurinha-tonko' });
      }
    } catch (error) {
      console.error(`Erro ao buscar figurinha: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar figurinha' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

// Figurinha Satoru
router.get('/sticker/figurinha-satoru', (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const randomSticker = getRandomSticker('figurinha-satoru');
      if (randomSticker) {
  //      decrementKeyUsage(apikey); // Diminuir uso da chave
        const stickerPath = path.join(__dirname, 'sticker', 'figurinha-satoru', randomSticker);
        res.sendFile(stickerPath);
      } else {
        res.status(404).json({ status: false, message: 'Nenhuma figurinha encontrada em figurinha-satoru' });
      }
    } catch (error) {
      console.error(`Erro ao buscar figurinha: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar figurinha' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});



// Figurinha Naruto
router.get('/sticker/figurinha-naruto', (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const randomSticker = getRandomSticker('figurinha-naruto');
      if (randomSticker) {
//      decrementKeyUsage(apikey); // Diminuir uso da chave
        const stickerPath = path.join(__dirname, 'sticker', 'figurinha-naruto', randomSticker);
        res.sendFile(stickerPath);
      } else {
        res.status(404).json({ status: false, message: 'Nenhuma figurinha encontrada em figurinha-naruto' });
      }
    } catch (error) {
      console.error(`Erro ao buscar figurinha: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar figurinha' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

// Figurinha Anime
router.get('/sticker/figurinha-anime', (req, res) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const randomSticker = getRandomSticker('figurinha-anime');
      if (randomSticker) {
       // decrementKeyUsage(apikey); // Diminuir uso da chave
        const stickerPath = path.join(__dirname, 'sticker', 'figurinha-anime', randomSticker);
        res.sendFile(stickerPath);
      } else {
        res.status(404).json({ status: false, message: 'Nenhuma figurinha encontrada em figurinha-anime' });
      }
    } catch (error) {
      console.error(`Erro ao buscar figurinha: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar figurinha' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html'));
  }
});

// Rota para pegar uma figurinha aleatória de figurinha-zinitsu
router.get('/sticker/figurinha-zinitsu', (req, res) => {
  const apikey = req.query.apikey;

  // Verifica se o parâmetro apikey está presente
  if (!apikey) return res.json({ status: false, message: '[!] Está faltando o parâmetro apikey' });

  // Verifica se a chave é válida
  if (keyLimits.hasOwnProperty(apikey)) {
    try {
      const randomSticker = getRandomSticker('figurinha-zinitsu');
      if (randomSticker) {
     ///   decrementKeyUsage(apikey); // Diminuir uso da chave
        const stickerPath = path.join(__dirname, 'sticker', 'figurinha-zinitsu', randomSticker);
        res.sendFile(stickerPath);
      } else {
        res.status(404).json({ status: false, message: 'Nenhuma figurinha encontrada em figurinha-zinitsu' });
      }
    } catch (error) {
      console.error(`Erro ao buscar figurinha: ${error.message}`);
      res.status(500).json({ status: false, message: 'Erro ao buscar figurinha' });
    }
  } else {
    res.sendFile(path.join(__dirname, '/views/key.html')); // Página de erro de key
  }
});

router.get('/scraper/npm', async (req, res) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json({ status: false, message: 'Query não especificada' });
  if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

  if (keyLimits.hasOwnProperty(apikey)) {
    keyLimits[apikey]--;

    if (keyLimits[apikey] <= 0) {
      delete keyLimits[apikey];
      return res.json({ status: false, message: 'Limite de uso da chave excedido' });
    }

    try {
      const { data } = await axios.get(`https://www.npmjs.com/search?q=${query}`, AXIOS_OPTIONS);
      const $ = cheerio.load(data);
      
      const result = [];
      $("._0d2164ff > div > a > h3").each((i, el) => {
        result.push({
          title: $(el).text(),
          link: 'https://npmjs.com' + $("._0d2164ff > div > a").eq(i).attr("href"),
          desc: $("._0d2164ff > p").eq(i).text().trim(),
          updated: $("._657f443d").eq(i).text().trim(),
          tags: $("._0d2164ff > ul > li > a").eq(i).text().trim(),
          tagurl: 'https://npmjs.com' + $("._0d2164ff > ul > li > a").eq(i).attr("href")
        });
      });

      res.json(result);
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  } else {
    res.sendFile(__path + '/views/key.html');
  }
});

router.get('/scraper/pypi', async (req, res) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json({ status: false, message: 'Query não especificada' });
  if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

  if (keyLimits.hasOwnProperty(apikey)) {
    keyLimits[apikey]--;

    if (keyLimits[apikey] <= 0) {
      delete keyLimits[apikey];
      return res.json({ status: false, message: 'Limite de uso da chave excedido' });
    }

    try {
      const { data } = await axios.get(`https://pypi.org/search/?q=${query}`, AXIOS_OPTIONS);
      const $ = cheerio.load(data);
      
      const result = [];
      $(".package-snippet__name").each((i, el) => {
        result.push({
          title: $(el).text().trim(),
          link: 'https://pypi.org' + $(".unstyled > li > a").eq(i).attr("href"),
          desc: $(".package-snippet__description").eq(i).text().trim(),
          version: $(".package-snippet__version").eq(i).text().trim(),
          update: $(".package-snippet__released > time").eq(i).text().trim()
        });
      });

      res.json(result);
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  } else {
    res.sendFile(__path + '/views/key.html');
  }
});

router.get('/scraper/github', async (req, res) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json({ status: false, message: 'Query não especificada' });
  if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

  if (keyLimits.hasOwnProperty(apikey)) {
    keyLimits[apikey]--;

    if (keyLimits[apikey] <= 0) {
      delete keyLimits[apikey];
      return res.json({ status: false, message: 'Limite de uso da chave excedido' });
    }

    try {
      const { data } = await axios.get(`https://github.com/search?q=${query}&type=Repositories`, AXIOS_OPTIONS);
      const $ = cheerio.load(data);
      
      const result = [];
      $(".d-flex > div > a").each((i, el) => {
        result.push({
          title: $(el).text().trim(),
          link: 'https://github.com' + $(".d-flex > div > a").eq(i).attr("href")
        });
      });

      res.json(result);
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  } else {
    res.sendFile(__path + '/views/key.html');
  }
});

//const express = require('express');
const { ndown } = require('nayan-media-downloader');
//const router = express.Router();

router.get('/download/instagram', async (req, res) => {
  const url = req.query.url;
  const apikey = req.query.apikey;

  if (!url) return res.json({ status: false, message: 'URL não especificada' });
  if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

  if (keyLimits.hasOwnProperty(apikey)) {
    keyLimits[apikey]--;

    if (keyLimits[apikey] <= 0) {
      delete keyLimits[apikey];
      return res.json({ status: false, message: 'Limite de uso da chave excedido' });
    }

    try {
      const response = await ndown(url);
      const { thumbnail, url: downloadUrl } = response.data[0];
      res.json({ status: true, thumbnail, url: downloadUrl });
    } catch (error) {
      res.json({ status: false, message: `Erro ao baixar mídia: ${error.message}` });
    }
  } else {
    res.sendFile(__path + '/views/key.html');
  }
});

router.get('/download/facebook_2', async (req, res) => {
  const url = req.query.url;
  const apikey = req.query.apikey;

  if (!url) return res.json({ status: false, message: 'URL não especificada' });
  if (!apikey) return res.json({ status: false, message: 'API key não especificada' });

  if (keyLimits.hasOwnProperty(apikey)) {
    keyLimits[apikey]--;

    if (keyLimits[apikey] <= 0) {
      delete keyLimits[apikey];
      return res.json({ status: false, message: 'Limite de uso da chave excedido' });
    }

    try {
      const response = await ndown(url);
      const { thumbnail, url: downloadUrl } = response.data[0];
      res.json({ status: true, thumbnail, url: downloadUrl });
    } catch (error) {
      res.json({ status: false, message: `Erro ao baixar mídia: ${error.message}` });
    }
  } else {
    res.sendFile(__path + '/views/key.html');
  }
});

router.get('/download/kwai', async (req, res) => {
  const url = req.query.url;
  const apikey = req.query.apikey;

  if (!url) return res.json({ status: false, message: '[!] Parâmetro de URL ausente' });
  if (!apikey) return res.json({ status: false, message: '[!] Parâmetro de API key ausente' });

  if (keyLimits.hasOwnProperty(apikey)) {
    keyLimits[apikey]--;

    if (keyLimits[apikey] <= 0) {
      delete keyLimits[apikey];
      return res.json({ status: false, message: 'Limite de uso da chave excedido' });
    }

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      let script5Content = '';
      $('script').each((index, element) => {
        if (index === 4) {
          script5Content = $(element).html();
          return false; // Interrompe o loop após encontrar o quinto script
        }
      });

      if (script5Content) {
        try {
          const jsonData = JSON.parse(script5Content);
          return res.json({ status: true, data: jsonData });
        } catch (error) {
          return res.json({ status: false, message: 'Erro ao parsear JSON' });
        }
      } else {
        return res.json({ status: false, message: 'O quinto script não foi encontrado.' });
      }
    } catch (error) {
      return res.json({ status: false, message: `Erro ao acessar a página: ${error.message}` });
    }
  } else {
    return res.sendFile(__path + '/views/key.html');
  }
});




module.exports = router