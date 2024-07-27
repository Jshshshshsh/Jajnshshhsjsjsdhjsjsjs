const yt = require("ytdl-core")
const yts = require("yt-search")
const axios = require("axios")
const cheerio = require("cheerio")
const unirest = require("unirest")
const ytdl = require('ytdl-core');
//const yts = require('yt-search');
//const fs = require("fs")
const { default: Axios } = require('axios')
//const cheerio = require('cheerio')
//const qs = require('qs')
const FormData = require('form-data')
const fs = require('fs')
const qs = require("qs")
const fetch = require('node-fetch')
//const FormData = require('form-data')
const request = require("request")

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
function formattedDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

 function xvideos(query){
return new Promise((resolve, reject) => {
  axios.get(`https://xvideosporno.blog.br/?s=${query}`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.postbox").each((_, say) => {
    var titulo = $(say).find("a").attr('title');
    var link = $(say).find("a").attr('href');
    var img = $(say).find("img").attr('src');
    var duração = $(say).find("time.duration-top").text().trim();
    var qualidade = $(say).find("b.hd-top").text().trim();
    var resultado = {
      titulo: titulo,
      img: img,
      duração: duração,
      qualidade: qualidade,
      link: link
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  })
}



async function kwai(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const hasil = [];
    const author = $('.name').text().trim();
    const legenda = $('p').text().trim();
    const video = $('#video-ele').attr('src');
    hasil.push({ author, legenda, video });
    return hasil;
  } catch (error) {
    throw error;
  }
}

async function imgsearch(query){
try {
const selectRandom = () => {
		const userAgents = [
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
			"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
		];
		const randomNumber = Math.floor(Math.random() * userAgents.length);
		return userAgents[randomNumber];
	};
	const user_agent = selectRandom();
	const header = {
		"User-Agent": user_agent,
	};
	return unirest
		.get(
			`https://www.google.com/search?q=${query}&oq=${query}&hl=en&tbm=isch&asearch=ichunk&async=_id:rg_s,_pms:s,_fmt:pc&sourceid=chrome&ie=UTF-8`
		)
		.headers(header)
		.then((response) => {
			const $ = cheerio.load(response.body);

			const images_results = [];
			$("div.rg_bx").each((i, el) => {
				const json_string = $(el).find(".rg_meta").text();
				const result = {
					link: JSON.parse(json_string).ru,
					original: JSON.parse(json_string).ou,
				};
				images_results.push(result);
			});
  //    console.log(images_results);
			return images_results;
		});
		
		    } catch (e) {
        console.log(e)
      }
}

async function stickerpack(query){
return new Promise((resolve, reject) => {
			axios.get(`https://getstickerpack.com/stickers?query=${query}`)
				.then(({data}) => {
					const $ = cheerio.load(data)
					const source = []
					const link = [];
					var	ya = $('#stickerPacks > div > div:nth-child(3) > div > a').text()
		if (!ya ) return resolve()
					$('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
						source.push($(b).attr('href'))
					})
					axios.get(source[Math.floor(Math.random() * source.length)])
						.then(({
							data
						}) => {
							const $$ = cheerio.load(data)
							$$('#stickerPack > div > div.row > div > img').each(function(c, d) {
								link.push($$(d).attr('src').replace(/&d=200x200/g,''))
							})
							result = {
								title: $$('#intro > div > div > h1').text(),
								sticker_url: link
							}
							resolve(result)
						})
				}).catch(reject)
		})
		}
		async function shortener(url) {
  return url;
}

async function tiktok(url) {
    try {
  const response = await axios.request(`https://tools.revesery.com/tiktok/revesery.php?url=${url}`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36",
    }
  });  
  const $ = cheerio.load(response.data);  
  const result = {
    status: true,
    title: $('p').text().replace("Here's the result:", ''),
    thumbnail: $('img').attr('src'),
    video: $('a.btn.btn-primary').attr('href')   
  }; 
  return result;
} catch (error) {
  return { status: false };
   }
}



async function instagram(url){
let res = await axios("https://indown.io/");
    let _$ = cheerio.load(res.data);
    let referer = _$("input[name=referer]").val();
    let locale = _$("input[name=locale]").val();
    let _token = _$("input[name=_token]").val();
    let {
        data
    } = await axios.post(
        "https://indown.io/download",
        new URLSearchParams({
            link: url,
            referer,
            locale,
            _token,
        }), {
            headers: {
                cookie: res.headers["set-cookie"].join("; "),
            },
        }
    );
    let $ = cheerio.load(data);
    let result = [];
    let __$ = cheerio.load($("#result").html());
    __$("video").each(function () {
        let $$ = $(this);
        result.push({
            type: "video",
            // thumbnail: $$.attr("poster"),
            url: $$.find("source").attr("src"),
        });
    });
    __$("img").each(function () {
        let $$ = $(this);
        result.push({
            type: "image",
            url: $$.attr("src"),
        });
    });

    return result;
  }

async function feicebook(url){
return new Promise((resolve,reject) => {
	let config = {
		'url': url
		}
	axios('https://www.getfvid.com/downloader',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent":  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1310699039.1624884412; _pbjs_userid_consent_data=3524755945110770; cto_bidid=rQH5Tl9NNm5IWFZsem00SVVuZGpEd21sWnp0WmhUeTZpRXdkWlRUOSUyQkYlMkJQQnJRSHVPZ3Fhb1R2UUFiTWJuVGlhVkN1TGM2anhDT1M1Qk0ydHlBb21LJTJGNkdCOWtZalRtZFlxJTJGa3FVTG1TaHlzdDRvJTNE; cto_bundle=g1Ka319NaThuSmh6UklyWm5vV2pkb3NYaUZMeWlHVUtDbVBmeldhNm5qVGVwWnJzSUElMkJXVDdORmU5VElvV2pXUTJhQ3owVWI5enE1WjJ4ZHR5NDZqd1hCZnVHVGZmOEd0eURzcSUyQkNDcHZsR0xJcTZaRFZEMDkzUk1xSmhYMlY0TTdUY0hpZm9NTk5GYXVxWjBJZTR0dE9rQmZ3JTNEJTNE; _gid=GA1.2.908874955.1625126838; __gads=ID=5be9d413ff899546-22e04a9e18ca0046:T=1625126836:RT=1625126836:S=ALNI_Ma0axY94aSdwMIg95hxZVZ-JGNT2w; cookieconsent_status=dismiss"
			}
		})
	.then(async({ data }) => {
		const $ = cheerio.load(data)	
		resolve({
			Normal_video: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			HD: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			audio: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a').attr('href')
			})
		})
	.catch(reject)
	})
}



async function ytDonlodMp3(url) {
  return new Promise((resolve, reject) => {
    try {
      const id = yt.getVideoID(url)
      const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        let audio = []
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
            let aud = pormat[i]
            audio.push(aud.url)
          }
        }
        let duration = data.player_response.videoDetails.lengthSeconds;
            let formattedDuration = formatDuration(duration);
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
        
        const resultado = {
          title: title,
          thumb: thumb,
          channel: channel,
          published: published,
          views: views,
          duration: formattedDuration,
          url: audio[1]
        }
        return(resultado)
      })
      resolve(yutub)
    } catch (error) {
        reject(error);
      }
      console.log(error)
  })
}

async function ytDonlodMp4(url) {
  return new Promise((resolve, reject) => {
    try {
      const id = yt.getVideoID(url)
      const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        let video = []
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
            let vid = pormat[i]
            video.push(vid.url)
          }
        }
        let duration = data.player_response.videoDetails.lengthSeconds;
            let formattedDuration = formatDuration(duration);
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
        
        const resultado = {
          title: title,
          thumb: thumb,
          channel: channel,
          published: published,
          views: views,
          duration: formattedDuration,
          url: video[0]
        }
        return(resultado)
      })
      resolve(yutub)
    } catch (error) {
        console.log(e)
        }
  })
}

async function ytGetInfo(url) {
  try {
    const id = ytdl.getVideoID(url);
    const data = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

async function ytPlayMp3(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const search = await yts(query);
            const url = [];
            const pormat = search.all;
            for (let i = 0; i < pormat.length; i++) {
                if (pormat[i].type == 'video') {
                    let dapet = pormat[i];
                    url.push(dapet.url);
                }
            }
            const id = yt.getVideoID(url[0]);
            const data = await yt.getInfo(`https://www.youtube.com/watch?v=${id}`);
            let pormat_ytmp3 = data.formats;
            let audio = [];
            for (let i = 0; i < pormat_ytmp3.length; i++) {
                if (pormat_ytmp3[i].mimeType == 'audio/webm; codecs="opus"') {
                    let aud = pormat_ytmp3[i];
                    audio.push(aud.url);
                }
            }
            let duration = data.player_response.videoDetails.lengthSeconds;
            let formattedDuration = formatDuration(duration);
            const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText;
            const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName;
            const views = data.player_response.microformat.playerMicroformatRenderer.viewCount;
            const published = data.player_response.microformat.playerMicroformatRenderer.publishDate;
 
            // Encurtar a URL usando TinyURL
            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${audio[0]}`);
            const shortUrl = response.data;

            const result = {
                título: title,
                thumb: thumb,
                canal: channel,
                publicado: published,
                visualizações: views,
                duration: formattedDuration,
                link: shortUrl
            };

            resolve(result);
        } catch (error) {
            reject(error);
            console.log(error);
        }
    });
}

async function ytPlayMp4(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const search = await yts(query);
            const url = [];
            const pormat = search.all;
            for (let i = 0; i < pormat.length; i++) {
                if (pormat[i].type == 'video') {
                    let dapet = pormat[i];
                    url.push(dapet.url);
                }
            }
            const id = yt.getVideoID(url[0]);
            const data = await yt.getInfo(`https://www.youtube.com/watch?v=${id}`);
            let pormat_ytmp4 = data.formats;
            let video = [];
            for (let i = 0; i < pormat_ytmp4.length; i++) {
                if (pormat_ytmp4[i].container == 'mp4' && pormat_ytmp4[i].hasVideo == true && pormat_ytmp4[i].hasAudio == true) {
                    let vid = pormat_ytmp4[i];
                    video.push(vid.url);
                }
            }

            let duration = data.player_response.videoDetails.lengthSeconds;
            let formattedDuration = formatDuration(duration);
            const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText;
            const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName;
            const views = data.player_response.microformat.playerMicroformatRenderer.viewCount;
            const published = data.player_response.microformat.playerMicroformatRenderer.publishDate;

            // Encurtar a URL usando TinyURL
            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${video[0]}`);
            const shortUrl = response.data;

            const resultado = {
                title: title,
                thumb: thumb,
                channel: channel,
                published: published,
                views: views,
                duration: formattedDuration,
                url: shortUrl
            };

            resolve(resultado);
        } catch (error) {
            reject(error);
            console.log(error);
        }
    });
}

async function play1(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let audio = []
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
                        let aud = pormat[i]
                        audio.push(aud.url)
                    }
                    }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const resultado = {
                    status: true,
                    code: 200,

                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: audio[0]
                    }
                    return(resultado)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}


async function ytSearch(query) {
    return new Promise((resolve, reject) => {
        try {
            const cari = yts(query)
            .then((data) => {
                resultado = data.all
                return resultado
            })
            resolve(cari)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function hentai(y) {
    return new Promise((resolve, reject) => {
       
        axios.get('https://sfmcompile.club/?redirect_to=random')
        .then((data) => {
            const $ = cheerio.load(data.data)
            const hasil = []
            $('#primary > div > div > ul > li > article').each(function (a, b) {
                hasil.push({
                    title: $(b).find('header > h2').text(),
                    link: $(b).find('header > h2 > a').attr('href'),
                    category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                    share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                    views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                    type: $(b).find('source').attr('type') || 'image/jpeg',
                    video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                    video_2: $(b).find('video > a').attr('href') || ''
                })
            })
            const random = hasil[Math.floor(Math.random() * hasil.length)]
            resolve({
                status: data.status,
                creator: 'Rapa',
                hasil: random
            })
        })
    })
}




module.exports = {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch,
  play1,
  imgsearch,
  tiktok,
  instagram,
  feicebook,
  stickerpack,
  xvideos,
  kwai
};
