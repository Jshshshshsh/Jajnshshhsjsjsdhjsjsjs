//const bing = require('bing-scraper')
const axios = require("axios")
const request = require('request')
const cheerio = require('cheerio');
const fs = require('fs')
const { spawn } = require('child_process')

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function w9apps(query)  {
    return new Promise((resolve, reject) => {

      let config = {
    method: 'GET',
    url: query,
    
};

        axios(config)
            .then(({
                data
            }) => {
                const $$1 = cheerio.load(data)
            
              let tokenpo = $$1('html > body.notranslate > div.body-content.body-content-in > div > div.pc-wrap.downloading > div > div > div.downloading-info.flex-1 > h1 > a.pc-btn-download.j-app-download').attr('href')
                
                resolve(token)
            })
            .catch(reject)
    })
}










function apkkkk(url) {
    return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: `https://apksos.com/download-app/com.whatsapp`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded;",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "cookie": "_ga=GA1.2.1040359019.1663052574; _gid=GA1.2.1101300480.1663052574; XSRF-TOKEN=eyJpdiI6IkZtWFZWSWp2STNjTHNGK05Pbk9nTWc9PSIsInZhbHVlIjoiRTdPVmlZOEpKSlVvMUl4U1BOWjQ2U2JQb1dZZk9rVDJRV1hoRFFRRnVPZWxQZjVPTitYWmdQZjdIcHlxSDZVdVBDd3lEczE3bHlJTUdOTVdGTG0zXC9nPT0iLCJtYWMiOiJiZGVhZjYwYzNhMGJiYzBhNTkyOGJkNDJlMzQ4M2M1YWNlMzQ1MjQwNjhmYWI1ZTliZWYwZWRhN2QwNDJhYmQ5In0%3D; laravel_session=eyJpdiI6Im5ONXJLUkhteHdXQk1jNGppQTlXVEE9PSIsInZhbHVlIjoidklBUU9QS1dcL05zVGlwZ1d0ZHJKWk5IVG40ZVdqVEFQUllIZFJ1aUZuZTM3XC9WZ0VWaUtuV0NaUUc3c3hzMlVCMTZMeWFRd2Z3Q0wwWGNTaXQ4eDN1Zz09IiwibWFjIjoiOWI1Y2U2YmI0ZTg1NGYzMjdmYTQ5Zjc5OTNkZjAyMGFiYmNjZjdkYWQxMzRhNjVjZWZhOTBmZjY0OGFkNjgzNSJ9"
                },
                formData: {url: url}
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)

              const $$ = cheerio.load(body)
            console.log(body)
              let token = $$('.pric > a').attr('href')
                
            
                resolve(token)
                
            })
    })
}



function apkkkks(query)  {
    return new Promise((resolve, reject) => {

      let config = {
    method: 'GET',
    url: `https://apksos.com/download-app/com.whatsapp`,
    
};

        axios(config)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
            
              let token = $$('.pric > a').attr('href')
                
            
                resolve(token)
            })
            .catch(reject)
    })
}




function memeku()  {
    return new Promise((resolve, reject) => {
        axios.get(`https://1cak.com/shuffle`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                $$('#content').each(function(a, b) {
               result = {
                   img: $$(b).find('> table > tr > td > img').attr('src')
               }
              resolve(result)
                })
                
            })
            .catch(reject)
    })
}


function mod1(query)  {
    return new Promise((resolve, reject) => {
       const er = axios.get(`${query}`)
            
                const $$ = cheerio.load(er.data)
              let token = $$('#blocks-left > div.post-content > div.post-outer.clearfix > div.download_button > a').attr('href')

      const era = axios.get(token)

               const $g = cheerio.load(era.data)
              let tokensd = $g('#dlbox > ul.dl > a:nth-child(1)').attr('href')
            
                resolve(tokensd)
            
            .catch(reject)
    })
}

function mod2(query)  {
    return new Promise((resolve, reject) => {
        axios.get(`${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
              let token = $$('#dlbox > ul.dl > a:nth-child(1)').attr('href')
                
            
                resolve(token)
            })
            .catch(reject)
    })
}



function apkdl2s(query)  {
    return new Promise((resolve, reject) => {
        axios.get(`https://apkpure.com/search?q=${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
              let token = $$('div.main.search-app > div.left > div.box > div.first.brand.is-brand > div.first-info.brand-info > div.info a').attr('href')
              let tokenv = $$('div.main.search-app > div.left > div.box > div.first.brand.is-brand > div.first-info.brand-info > div.info a').attr('href')
                
            
                resolve(token)
            })
            .catch(reject)
    })
}

function apkdl2ss(query)  {
    return new Promise((resolve, reject) => {
        axios.get(`https://apkpure.com/search?q=${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
              let token = $$('div.main.search-app > div.left > div.box > div.first.brand.is-brand > div.first-info.brand-info > div.info a').attr('href')
                
            
                resolve(token)
            })
            .catch(reject)
    })
}


function apkdl2inf(query)  {
    return new Promise((resolve, reject) => {
        axios.get(`${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
              let token = $$('div.main.search-app > div.left > div.box > div.first.brand.is-brand > div.first-info.brand-info > a.da').attr('href')
                
            
                resolve(token)
            })
            .catch(reject)
    })
}

function apkdl2(query)  {
    return new Promise((resolve, reject) => {
        axios.get(`${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
              let token = $$('div.main.search-app > div.left > div.box > div.first.brand.is-brand > div.first-info.brand-info > a.da').attr('href')
                
            
                resolve(token)
            })
            .catch(reject)
    })
}



















function playstoredld(query)  {
    return new Promise((resolve, reject) => {
        axios.get(`https://apksfull.com/search/${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
              let token = $$('div.c.m.fw > div.cols > div.col.left > div > div.cols.multi-line > a').attr('href')
                
            
                resolve(token)
            })
            .catch(reject)
    })
}


function playstoredl(query)  {
    return new Promise((resolve, reject) => {
        axios.get(`https://apksfull.com${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)

               let token = $$('div.c.m.fw > div.cols > div.col.left > div.cols >  a.btn-dl').attr('href')
                resolve(token)
            })
            .catch(reject)
    })
}

function playstoredlll(query)  {
    return new Promise((resolve, reject) => {
        axios.get(`https://apksfull.com${query}`)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
  $$('div.c.m.fw > div.cols > div.col.left > div.apk-info > table.apk-info > tbody').each(function(a, b) {
               result = {
                  version: $$(b).find('> tr:nth-child(2) > td:nth-child(2)').text(),
                  updated: $$(b).find('> tr:nth-child(4) > td:nth-child(2)').text(),
                  developer: $$(b).find('> tr:nth-child(5) > td:nth-child(2)').text(),
                  id: $$(b).find('> tr:nth-child(7) > td:nth-child(2)').text(),
                 requirements: $$(b).find('> tr:nth-child(8) > td:nth-child(2)').text(),
                  installed: $$(b).find('> tr:nth-child(9) > td:nth-child(2)').text()
               }
                resolve(result)
                })
                
            })
            .catch(reject)
    })
}



function jadwaltv()  {
    return new Promise((resolve, reject) => {
        axios.get('http://www.dokitv.com/jadwal-acara-tv')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('#c.m.w > tbody > tr ').each(function(a, b) {
                    result = {
                    acara: $(b).find('> td:nth-child(2)').text(),
                    channel: $(b).find('> td > a').text(),
                    jam: $(b).find('> td.jfx').text(),
                    source: $(b).find('> td > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

function film(query)  {
	return new Promise((resolve, reject) => {
		axios.get(`http://167.99.31.48/?s=${query}`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const hasil = [];
				$('#content > div > div.los').each(function (a, b) {
                    $(b).find('article').each(function (c, d) {
                        const judul = $(d).find('div > a > div.addinfox > header > h2').text()
                        const quality = $(d).find('div > a > div > div > span').text()
                        const type = $(d).find('div > a > div.addinfox > div > i.type').text()
                        const upload = $(d).find('div > a > div.addinfox > div > span').text()
                        const link = $(d).find('div > a').attr('href');
                        const thumb = $(d).find('div > a > div > img').attr('src');
                        const result = {
                            judul: judul,
                            quality: quality,
                            type: type,
                            upload: upload,
                            link: link,
                            thumb: thumb,
                        };
                        hasil.push(result);
                    });
                });
				resolve(hasil)
			})
			.catch(reject)
	})
}



function bingimage(query) {
    return new Promise((resolve, reject) => {
    	bing.imageSearch({q: query,enforceLanguage: true}, function(err, resp) {
    		if (err) {
    			console.log(err)
    		} else {
    			const result = {
    				status: 200,
    				...resp
    			}
    			resolve(result)
    		}
    	})
    })
}


function bingsearch(query)  {
    return new Promise((resolve, reject) => {
    	bing.search({q: query,enforceLanguage: true}, function(err, resp) {
    		if (err) {
    			console.log(err)
    		} else {
    			const result = {
    				status: 200,
    				...resp
    			}
    			resolve(result)
    		}
    	})
    })
}


function imdb(url) {
    return new Promise((resolve, reject) => {
        axios.get('https://freedownloadvideo.net/imdb-video-downloader').then((data) => {
            let a = cheerio.load(data.data)
            let token = a('#token').attr('value')
            const options = {
                method: 'POST',
                url: `https://freedownloadvideo.net/wp-json/aio-dl/video-data/`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded;",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "cookie": "PHPSESSID=jue6d59cnfgu8pmraa971cetm6; _gid=GA1.2.1096581014.1656129824; __gads=ID=855f6257a3b17608-227b1200fed200a7:T=1656129824:RT=1656129824:S=ALNI_MYlQs2q77JAmj399O3YnmMSElqAIA; __gpi=UID=0000068f8a6124cf:T=1656129824:RT=1656129824:S=ALNI_MZhz1dM3pQuLjvXkFxtGqNtiIo4yw; _ga_KN64Y44T94=GS1.1.1656129823.1.1.1656130205.0; _ga=GA1.2.1859454192.1656129824"
                },
                formData: {url: url,token: token}
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                res = JSON.parse(body)
                result = {
                    status: 200,
                    ...res,
                }
                resolve(result);
            })
        }).catch(reject)
    })
}


function attp(query) {
  return new Promise(async(resolve, reject) => {
  const getid = await axios.get('https://id.bloggif.com/query')
  const id = cheerio.load(getid.data)('#content > form').attr('action')
  const options = {
            method: "POST",
            url: `https://id.bloggif.com${id}`,
            headers: {
                "content-type": 'application/x-www-form-urlencoded',
                "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
            },
            formData: {
                target: 1,
                query: query,
                glitter_id: Math.floor(Math.random() * 2821),
                font_id: 'lucida_sans_demibold_roman',
                size: 50,
                bg_color: 'FFFFFF',
                transparent: 1,
                border_color: '000000',
                border_width: 2,
                shade_color: '000000',
                shade_width: 1,
                angle: 0,
                text_align: 'center'
            },
        };
        request(options, async function(error, response, body) {
          if (error) return new Error(error)
          const $ = cheerio.load(body)
          const url = $('#content > div:nth-child(10) > a').attr('href')
          resolve({status: 200, result: 'https://id.bloggif.com' + url})
        })
    })
}

function ttp(text) {
    return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "Cookie": "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1"
                },
                formData: {
                    'TextToRender': text,
                    'FontSize': '100',
                    'Margin': '30',
                    'LayoutStyle': '0',
                    'TextRotation': '0',
                    'TextColor': 'ffffff',
                    'TextTransparency': '0',
                    'OutlineThickness': '3',
                    'OutlineColor': '000000',
                    'FontName': 'Lekton',
                    'ResultType': 'view'
                }
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                const $ = cheerio.load(body)
                const result = 'https://www.picturetopeople.org' + $('#idResultFile').attr('value')
                resolve({ status: 200, result: result })
            });
        })
}



function tiktoktren() {
    return new Promise((resolve, reject) => {
    axios.get("https://brainans.com/").then(async(data) => {
    const $ = cheerio.load(data.data);
    const result = {};
    const plink = [];
    result["status"] = "200";
    result["result"] = [];
    async function getmetadata(link, views) {
        const data = await axios.get("https://brainans.com" + link);
        const $$ = cheerio.load(data.data);
        result["result"].push({
            username: $$("#card-page").find("div.main__user-desc.align-self-center.ml-2 > a").text(),
            upload_time: $$("#card-page").find("div.main__user-desc.align-self-center.ml-2").text().split($$("#card-page").find("div.main__user-desc.align-self-center.ml-2 > a").text())[1].trim(),
            caption: $$("#card-page").find("div.main__list").text(),
            views: views,
            like: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(1) > span").text(),
            comment: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(2) > span").text(),
            share: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(3) > span").text(),
            video: $$("#card-page").find("video").attr("src"),
        });
    }
    $("#welcome_videos > div > div > a").each(function(a, b) {
        plink.push({link: $(b).attr("href"),views: $(b).find("div.video_view_count.bx.bx-show > span").text(),
        });
    });
    for (let i = 0; i < 10; i++) {
        await getmetadata(plink[i].link, plink[i].views);
    }
    resolve(result)
}).catch(reject)
})
};


function drakor(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://173.212.240.190///?s=${query}&post_type=post`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('#post > div ').each(function(a, b) {
                    result = {
                    status: 200,
                    judul: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > h2 > a').text().trim(),
                    years: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > div.category.text-gray.font-normal.text-white.text-xs.truncate > a').text(),
                    genre: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > div.genrenya.text-center.text-white.text-opacity-75.text-xs.mt-1').text().trim(),
                    thumbnail: $(b).find('> div.thumbnail > a > img').attr('src'),
                    url: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > h2 > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}




function tahta(text){
 return new Promise(async (resolve, reject) => {
  if (!global.support.magick && !global.support.convert) reject('ImageMagick Not Installed!')
  try {
var hartatahtaapa = text.replace(/(\S+\s*){1,23}/g, '$&\n')
    apa = 'HARTA\nTAHTA\n' + hartatahtaapa.toUpperCase()
    spawn(global.support.magick ? 'magick' : global.support.convert ? 'convert' : '', [
        '-gravity',
        'Center',
        '-size',
        '1280x1280',
        'xc:black',
        '-font',
        './tahta/BubbleShine.ttf',
        '-pointsize',
        '200',
        '-tile',
        './tahta/hartatahta-before.jpg',
        '-annotate',
        '+20+80',
        apa,
        '-wave',
        '10x175',
        './tmp/hartatahta-after.jpg'
    ])
    .on('error', (e) => {
        reject(e)
    })
    .on('exit', () => {
        resolve(fs.readFileSync('./tmp/hartatahta-after.jpg'))
        fs.unlinkSync('./tmp/hartatahta-after.jpg')
    })
   } catch (e) {
   reject(e)
}
   })
   }

function turnbackhoax() {
return new Promise((resolve, reject) => {
  axios.get(`https://turnbackhoax.id/`).then( tod => {
  const $ = cheerio.load(tod.data)
  
  hasil = [];
  
  $('figure.mh-loop-thumb').each(function(a, b) {
    $("div.mh-loop-content.mh-clearfix").each(function(c, d) {
       result = {
    link: $(d).find("h3.entry-title.mh-loop-title > a").attr('href'),
    img: $(b).find("img").attr('src'),
    title: $(d).find("h3.entry-title.mh-loop-title > a").text().trim(),
    desc: $(d).find("div.mh-excerpt > p").text().trim(),
    date: $(d).find("span.mh-meta-date.updated").text().trim()
       }
 
    hasil.push(result)
    });
  });
  resolve(hasil)
  }).catch(reject)
  });
}

function wallpaperggpa(title, page = '1') {
    return new Promise((resolve, reject) => {
		const random = [1,2,3,4,5,6,7,8,9,10]
		let randomgambar = random[Math.floor(Math.random() * random.length)]
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${randomgambar}&q=${title}`)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('div.grid-item').each(function (a, b) {
                hasil.push({
                    title: $(b).find('div.info > a > h3').text(),
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    source: 'https://www.besthdwallpaper.com'+$(b).find('div > a:nth-child(3)').attr('href'),
                    image:  $(b).find('picture > source:nth-child(2)').attr('srcset')
                })
            })
	
            resolve(hasil)
		})
		.catch(reject)
		})
}

function ringtone(title) {
    return new Promise((resolve, reject) => {
        axios.get('https://meloboom.com/en/search/'+title)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let hasil = []
            $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function (a, b) {
                hasil.push({ title: $(b).find('h4').text(), source: 'https://meloboom.com/'+$(b).find('a').attr('href'), audio: $(b).find('audio').attr('src') })
            })
            resolve(hasil)
        })
    })
}



module.exports = { jadwaltv, film, bingimage, bingsearch, imdb, attp, ttp, tiktoktren, drakor, tahta, turnbackhoax, wallpaperggpa, playstoredld, playstoredl, playstoredlll, ringtone, memeku ,mod2 ,mod1, apkkkk, w9apps }