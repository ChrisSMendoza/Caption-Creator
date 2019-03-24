// main-server.js
const cors = require('cors');
const morgan = require('morgan');

const express = require('express');
const bodyParser = require('body-parser');

const cheerio = require('cheerio');
const rp = require('request-promise');
const request = require('superagent'); // http requests

const standsLyrics = require('./apis/standsLyrics/StandsLyrics.js');

const PORT = 8081; // since vue dev server defaults to 8080
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json({ type: 'application/json' }))


// req.params.term: the term used to search for music
const getLyricsLinks = (req, res) => {

	const {BASE_URL, TOKEN, USER_ID} = standsLyrics;

	request.get(BASE_URL)
        .query({ uid: USER_ID})
        .query({ tokenid: TOKEN })
        .query({ term: req.params.term })
        .query({ format: "json" })
        .then(lyricsResponse => {
    		let music = lyricsResponse.body.result;
    		
    		res.send(getUniqueLyricLinks(music));
        })
        .catch(err => console.log(err));
};
const getUniqueLyricLinks = (allMusic) => {

	let artistNames = new Set();

	// filter duplicate songs
	let uniqueSongLyrics = allMusic.filter(musicObj => {

		// this song and artist haven't been tracked yet
		if(!artistNames.has(musicObj.artist)) {
			artistNames.add(musicObj.artist); // mark as tracked
			return true; // add it to filtered results
		}
		return false; // don't need this result
	});
	return uniqueSongLyrics;
};
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