// main-server.js
const cors = require('cors');
const morgan = require('morgan');

const express = require('express');
const bodyParser = require('body-parser');

const cheerio = require('cheerio');
const request = require('request-promise'); // http request that returns a promise

const PORT = 8081; // since vue dev server defaults to 8080
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json({ type: 'application/json' }))

app.get('/', (req, res) => {

	const testUrl = "https://www.lyrics.com/lyric/185729";
	
	request(testUrl)
		.then(html => {
			console.log(html)

			let lyrics = cheerio('#lyric-body-text', html);
			res.send(lyrics.text());
		})
		.catch(err => console.log(err));
});

console.log(`listening on port ${PORT}`);
app.listen(PORT);