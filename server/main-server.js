// main-server.js
const fs = require('fs');
const cors = require('cors');
const morgan = require('morgan');

const express = require('express');
const bodyParser = require('body-parser');

const cheerio = require('cheerio');
const rp = require('request-promise');
const request = require('superagent'); // http requests

const standsLyrics = require('./apis/standsLyrics/StandsLyrics.js');
const mockLyricsResponse = require('./apis/standsLyrics/mockData.js');
const reflectPromise = require('./reflect-promise.js');

const PORT = 8081; // since vue dev server defaults to 8080
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json({ type: 'application/json' }))

// Get a list of music objects w/ song name, artist name, and links to the lyrics
// req.params.term: the term used to search for music
const getLyricsLinks = (req, res) => {

	const {BASE_URL, TOKEN, USER_ID} = standsLyrics;

	request.get(BASE_URL)
        .query({ uid: USER_ID})
        .query({ tokenid: TOKEN })
        .query({ term: req.params.term })
        .query({ format: "json" })
        .then(getUniqueMusicObjs) // filter lyrics links and scrape their lyrics
        .catch(err => console.log(err));
};// USING STATIC DATA BELOW
	


const getLyricsHtmlRequest = (musicObj) => {
	return request(musicObj['song-link']);
};
const getLyricsHtmlRequests = (uniqueMusicObjs) => {

	return uniqueMusicObjs.map(getLyricsHtmlRequest)
};
const getLyricsHtmlPages = async (musicObjs) => {

	const lyricsHtmlRequests = getLyricsHtmlRequests(musicObjs);

	return Promise.all(lyricsHtmlRequests);
}

const getMockApiResonse = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockLyricsResponse), 2000)
  })
};

const getUniqueMusicObjs = (lyricsResponse) => {
	
	let rawMusicObjs = lyricsResponse.body.result; // [{song, artist, links to lyrics}]
	let artistNames = new Set();

	// filter duplicate songs
	let uniqueMusicObjs = rawMusicObjs.filter(musicObj => {

		// this song and artist haven't been tracked yet
		if(!artistNames.has(musicObj.artist)) {
			artistNames.add(musicObj.artist); // mark as tracked
			return true; // add it to filtered results
		}
		return false; // don't need this result
	});
	return uniqueMusicObjs;
};

const getLyrics = async (req, res) => {

	//DEV: USING STATIC RESPONSE, 
	const lyricsResponse = await getMockApiResonse(); // replace with getMusicObjsWithTerm(userTerm)

	const musicObjs = getUniqueMusicObjs(lyricsResponse);

	const lyricsHtmlPages = await getLyricsHtmlPages(musicObjs);
	// api request, reponse objects are actually returned, can access html with res.text

	appendScrapedLyrics(musicObjs, lyricsHtmlPages);
	
	return musicObjs
}



getLyrics(null, null)
.then(musicObjs => {console.log(musicObjs)})
.catch(err => console.log(err));



// SCRAPING THE RAW HTML TEXT
// const mockHTMLPage = fs.readFileSync('./apis/standsLyrics/mockHTMLPage.js', 'utf8');

// const scrapeMockHTML = (mockHTML) => {
	
// 	return cheerio('#lyric-body-text', mockHTML).text();
// };




const appendScrapedLyrics = (musicObjs, lyricsHtmlPages) => {

	//REFACTOR: rename
	// lyricsHtmlTexts is the raw source code string
	// lyricsHtmlPages are network responses with a text property

	let lyricsHtmlTexts = lyricsHtmlPages.map(htmlPage => {
		return htmlPage.text;
	});

	// lyrics were scraped in the same order as received
	// append scraped lyrics into each music obj
	lyricsHtmlTexts.forEach((lyricsHtmlText, current) => {
		musicObjs[current].lyrics = cheerio('#lyric-body-text', lyricsHtmlText).text();
	});
};

const attachLyricsToMusicObjs = async (uniqueMusicObjs) => {

	const lyricsHtmlRequests = getLyricsHtmlRequests(uniqueMusicObjs);

	// let lyricsHtmlPages = await Promise.all(lyricsHtmlRequests);
	Promise.all(lyricsHtmlRequests)
		then(lyricsHtmlPages => {
			let lyricsSheets = getScrapedLyrics(lyricsHtmlPages);

			lyricsSheets.forEach(sheet => console.log(sheet));// print out all lyrics
			return lyricsSheets;
		})
		.catch(err => {
			throw err;
		});
}


const getLyricsFromResponse = (lyricsResponse) => {
	let rawMusicObjs = lyricsResponse.body.result; // possible duplicates
	const musicObjs = getUniqueMusicObjs(rawMusicObjs); // filter them

	const lyricsHtmlPromises = musicObjs.map(getLyricsHtmlPromise); // to be resolved for lyrics

	Promise.all(lyricsHtmlPromises)
		.then(appendScrapedLyrics)
		.catch(err => console.log(err));
};
const getLyricsHtmlPromise = (musicObj) => {

	return request(musicObj['song-link']);
};







// use the term provided by the client to search for song lyrics
app.get('/get-lyrics/:term', getLyrics);






// request(testUrl)
// 	.then(html => {
// 		console.log(html)

// 		let lyrics = cheerio('#lyric-body-text', html);
// 		res.send(lyrics.text());
// 	})
// 	.catch(err => console.log(err));


console.log(`listening on port ${PORT}`);
app.listen(PORT);