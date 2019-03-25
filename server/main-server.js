// main-server.js
const cors = require('cors');
const morgan = require('morgan');

const express = require('express');
const bodyParser = require('body-parser');

const cheerio = require('cheerio');
const rp = require('request-promise');
const request = require('superagent'); // http requests

const standsLyrics = require('./apis/standsLyrics/StandsLyrics.js');
const mockLyricsResponse = require('./apis/standsLyrics/mockData.js');

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
const attachLyricsToMusicObjs = async (uniqueMusicObjs) => {

	const lyricsHtmlRequests = getLyricsHtmlRequests(uniqueMusicObjs);

	try {
		let lyricsHtmlPages = await Promise.all(lyricsHtmlRequests);
	} catch(e) {
		console.log(e);
	};
	
	scrapeLyricsSheet

}



const getLyricsHtmlRequest = (musicObj) => {
	return request(musicObj['song-link']);
};
const getLyricsHtmlRequests = (uniqueMusicObjs) => {

	uniqueMusicObjs.map(getLyricsHtmlRequest)
};




const getScrapedLyrics = (htmlPages) => {

	let allLyrics = htmlPages.forEach(htmlPage => {
		return cheerio('#lyric-body-text', htmlPage);
	});
	return allLyrics;
};
const getLyricsFromResponse = (lyricsResponse) => {
	let rawMusicObjs = lyricsResponse.body.result; // possible duplicates
	const musicObjs = getUniqueMusicObjs(rawMusicObjs); // filter them

	const lyricsHtmlPromises = musicObjs.map(getLyricsHtmlPromise); // to be resolved for lyrics

	Promise.all(lyricsHtmlPromises)
		.then(getScrapedLyrics)
		.catch(err => console.log(err));
};
const getLyricsHtmlPromise = (musicObj) => {

	return request(musicObj['song-link']);
};



//DEV: USING STATIC RESPONSE
// getLyrics(mockLyricsResponse);









// use the term provided by the client to search for song lyrics
app.get('/get-lyrics/:term', getLyricsLinks);



// request(testUrl)
// 	.then(html => {
// 		console.log(html)

// 		let lyrics = cheerio('#lyric-body-text', html);
// 		res.send(lyrics.text());
// 	})
// 	.catch(err => console.log(err));







console.log(`listening on port ${PORT}`);
app.listen(PORT);