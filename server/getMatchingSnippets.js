
const lyricsSheet = require('./apis/standsLyrics/mockLyricsSheet.js');
// console.log(lyricsSheet);

// splits long string of lyrics into lines at each index of an array
const splitLyricsByLine = (rawLyrics) => {

	let rawLines = rawLyrics.split('\n'); // grab anything ending with a newline

	let nonEmptyLines = rawLines.filter(rawLine => rawLine.length > 0)

	let trimmedLines = nonEmptyLines.map(nonEmptyLine => nonEmptyLine.trim());

	return trimmedLines;
}

// filter out repeating lines, keeps duplicates out of final results
const getUniqueLyricsLines = (lyricsLines) => {

	const filteringSet = new Set(lyricsLines);

	return Array.from(filteringSet);
};

const getConceptsWithLineNumbers = (lyricsLines, conceptWords) => {

	let indexedWords = new Map(); // match a concept word to its line numbers

	// search lyrics lines for concept words
	lyricsLines.forEach((lyricsLine, currLineNum) => {

		// grab the current line's words (may contain trailing commas)
		let rawWords = lyricsLine.split(" ");

		rawWords.forEach(rawWord => {

			word = rawWord.replace(/,/g, ''); // remove any commas attached to word

			// this word matches a concept word
			if(conceptWords.includes(word)) {

				// this concept has been seen before, update its line numbers
				if(indexedWords.has(word)) {
					let lineNums = indexedWords.get(word);
					lineNums.push(currLineNum); // add the new found line number

					indexedWords.set(word, lineNums); // update the word's line numbers
				}
				else // new concept word, map it's first line number
					indexedWords.set(word, [currLineNum]);
			}
		});
	});
	return indexedWords;
}

module.exports = {
	getConceptsWithLineNumbers,
	getUniqueLyricsLines,
	splitLyricsByLine
};