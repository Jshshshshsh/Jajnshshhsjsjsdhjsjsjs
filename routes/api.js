__path = process.cwd()

var express = require('express');
var router  = express.Router();
var fs = require('fs');
const path = require('path');
//*************************///

var criador = 'Frost.M4ax'

var chaveapi = 'SupraOfc'
var chaveapi = 'SupraOfc';


//const fs = require('fs');

//const fs = require('fs');

let requestCount = {};
let keyLimits = {};

// Função para carregar dados do JSON
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

// Salva os contadores de requisições e os limites no arquivo JSON
const saveRequestData = () => {
  try {
    fs.writeFileSync("requestCount.json", JSON.stringify({ requestCount, keyLimits }, null, 2), "utf8");
  } catch (err) {
    console.error("Erro ao escrever no arquivo JSON:", err);
  }
};

// Inicializa os dados de requisições e limites
const rateLimitMiddleware = async (req, res, next) => {
  // Recarrega os dados a cada requisição
  loadRequestData();
  
  const apikey = req.query.apikey || chaveapi; // Usar a variável chaveapi se a querystring não fornecer uma

  if (!apikey) return res.json({ error: "API key não fornecida." });

  // Verifica se a chave existe no JSON carregado
  if (keyLimits[apikey] && keyLimits[apikey].valid) {
    const limit = keyLimits[apikey].limit || 0;

    // Verifica se a chave atingiu o limite de requests
    if (requestCount[apikey] && requestCount[apikey] >= limit) {
      keyLimits[apikey].valid = false; // Invalida a chave quando atinge o limite
      saveRequestData(); // Salva o estado atualizado
      return res.status(429).json({ error: "Limite de requests atingido para esta API key." });
    }

    // Incrementa o contador de requests para a chave
    requestCount[apikey] = (requestCount[apikey] || 0) + 1;
    saveRequestData(); // Salva os dados de requisições no arquivo JSON

    next(); // Continua para a rota
  } else {
    res.status(401).json({ error: "Chave de API inválida ou esgotada." });
  }
};

// Carregar os dados ao iniciar
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
//var router  = express.Router();

var { spawn, exec } = require('child_process');
var { color, bgcolor } = require(__path + '/lib/color.js');

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
const { createWelcomeCard } = require('./../lib/scraper-wl');
const { createAttp } = require('./../lib/attp');

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
  tiktok,
  imgsearch,
  feicebook,
  instagram,
  stickerpack,
  xvideos
} = require("./../lib/utils/yt");

//loadRequestData();

// Use o middleware de limitação para todas as rotas
router.use(rateLimitMiddleware);

router.get('/cekapikey', async (req, res, next) => {
  const apikey = req.query.apikey;
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(apikey)) {
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

const mumaker = require("mumaker")

router.get("/download/wallpaperscraft", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(apikey)) {
    wallpaperscraft(query)
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

router.get("/aleatorios/attp", async (req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  const outputPath = path.join(__dirname, '..', 'tmp', 'attp.gif'); // Assumindo que a pasta 'tmp' exista
  
  if (!query) return res.json(loghandler.notquery);
  if (!apikey) return res.json(loghandler.notparam);
    if (keyLimits[apikey] && keyLimits[apikey].valid) {
    try {
      const result = await createAttp(query, outputPath, './lib/font/Roboto-Black.ttf');
      res.sendFile(outputPath);
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  } else {
    res.sendFile(__path + '/views/key.html');
  }
});

router.get("/aleatorios/fig-naruto", async (req, res, next) => {
  const apikey = req.query.apikey;

  if (!apikey) return res.json(loghandler.notparam);
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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

router.get("/download/wallpaperflare", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  // Verifique se a chave da API é válida
  const apiValidation = checkApiLimits(apikey);
  if (!apiValidation.valid) {
    return res.json({
      status: false,
      criador: `${criador}`,
      mensagem: apiValidation.message,
    });
  }

  // Verifique se o limite de requests foi atingido
  if (apiValidation.limitExceeded) {
    return res.json({
      status: false,
      criador: `${criador}`,
      mensagem: apiValidation.message,
    });
  }

  // Restante do código...
  try {
    wallpaperflare(query)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  } catch (error) {
    res.json({
      status: false,
      criador: `${criador}`,
      mensagem: 'Erro ao processar a solicitação.',
      error: error.message,
    });
  }
});

router.get("/download/ytsearch", async (req, res, next) => {
  const apikey = req.query.apikey;
 const query = req.query.query;
  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(Apikey)) {
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


router.get('/api/game/adivipersonagem', async (req, res, next) => {
  var Apikey = req.query.apikey
  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(Apikey)) {
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
  if (keyLimits.includes(apikey)) {
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

router.get("/download/playstoredld", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(apikey)) {
    bingimage(query)
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
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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


router.get("/download/letraMusica", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(apikey)) {
    letraMusica(query)
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

router.get("/download/porno", async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(apikey)) {
    porno(query)
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
  const apikey = req.query.apikey || chaveapi; // Usar a variável chaveapi se a querystring não fornecer uma

  if (!query) return res.json(loghandler.notquery);
  if (!apikey) return res.json(loghandler.notparam);

  if (keyLimits[apikey] && keyLimits[apikey].valid) {
    const limit = keyLimits[apikey].limit || 0;

    // Verifica se a chave atingiu o limite de requests
    if (requestCount[apikey] && requestCount[apikey] >= limit) {
      keyLimits[apikey].valid = false; // Invalida a chave quando atinge o limite
      saveRequestData(); // Salva o estado atualizado
      return res.status(429).json({ error: "Limite de requests atingido para esta API key." });
      // Status 429 indica "Too Many Requests"
    }

    // Processa a solicitação
    try {
      const result = await pinterest(query);

      // Incrementa o contador de requests para a chave
      requestCount[apikey] = (requestCount[apikey] || 0) + 1;

      // Salva os dados de requisições no arquivo JSON
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




// Exemplo de uso no endpoint
router.get("/download/pinterest_vd", async (req, res, next) => {
    const url = req.query.url;
    const apikey = req.query.apikey;
    if (!url) return res.json({ error: "URL não fornecida." });
    if (!apikey) return res.json({ error: "API key não fornecida." });

    try {
        if (keyLimits.includes(apikey) && keyLimits[apikey] && keyLimits[apikey].valid) {
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
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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

router.get('/find', async (req, res, next) => {
var apikey = req.query.apikey
if (!apikey) return res.json(resposta.semkey)
if (apikey != 'supra') return res.json(resposta.semkey)
try {
        zahirr.find()
            .then(result => {
                res.json({
                    status: true,
                    criador: `${criador}`,
                    result
                })
        })
} catch (e) {
res.json(resposta.error)
}
})

router.get("/apikeyadd", async (req, res, next) => {
  const key = req.query.key;
  if(keyLimits.includes(key)) {
    res.json({
      message: 'apikey está registrado'
    });
  } else {
    keyLimits.push(key);
    res.json({
      message: `registado com sucesso ${key} para banco de dados`
    });
  }
});

router.get("/apikeydel", async (req, res, next) => {
	const apikey = req.query.apikey;
	if(keyLimits.includes(apikey)){
		res.json({
			message: 'apikey não existia antes'
			})
			} else {
	keyLimits.splice(apikey, 1)
	res.json({
		message: 'apikey excluído com sucesso' 
});
 }
});

router.get('/frasesdebomdia', async (req, res, next) => {
  var Apikey = req.query.apikey
  if (!Apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(Apikey)) {
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
  if (keyLimits.includes(Apikey)) {
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
  if (keyLimits.includes(Apikey)) {
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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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


// const url = req.query.url;
  const apikey = req.query.apikey;
  if (!query) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(apikey)) {
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

router.get('/download/tiktok', async (req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(apikey)) {
    tiktok(url)
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

router.get('/download/instagram', async (req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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

router.get('/download/tiktok', async (req, res, next) => {
  const url = req.query.url;
  const apikey = req.query.apikey;
  if (!url) return res.json(loghandler.noturl)
  if (!apikey) return res.json(loghandler.notparam)
  if (keyLimits.includes(apikey)) {
    tiktok(url)
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
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(apikey)) {
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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {
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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

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
  if (keyLimits.includes(Apikey)) {

    const femdomData = JSON.parse(fs.readFileSync(__path + '/data/femdom.json'));
    const randFemdomData = femdomData[Math.floor(Math.random() * femdomData.length)];
    data = await fetch(randFemdomData).then(v => v.buffer())
    await fs.writeFileSync(__path + '/tmp/femdom.jpeg', data)
    res.sendFile(__path + '/tmp/femdom.jpeg')
  } else {
    res.sendFile(__path + '/views/key.html')
  }
  
  
})


module.exports = router