
const lyricsSheet = require('./apis/standsLyrics/mockLyricsSheet.js');
// console.log(lyricsSheet);

// splits long string of lyrics into lines at each index of an array
const splitLyricsByLine = (rawLyrics) => {

	let rawLines = rawLyrics.split('\n'); // grab anything ending with a newline

	let nonEmptyLines = rawLines.filter(rawLine => rawLine.length > 0)

	let trimmedLines = nonEmptyLines.map(nonEmptyLine => nonEmptyLine.trim());

	return trimmedLines;
}

module.exports = {
	splitLyricsByLine
};