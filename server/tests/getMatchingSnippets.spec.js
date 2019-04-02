
const { getUniqueLyricsLines, splitLyricsByLine } = require('../getMatchingSnippets.js');
// tests for: 
// 	getMatchingSnippets(rawLyrics)

// input - @rawLyrics: a long string of lyrics (contains new lines)

// output - @snippets: a set of strings that contain the search term
//
//[
	// [
	// 		"I'm on the pursuit of happiness, and I know
	// 		Everything that shine ain't always gonna be gold",

	// 		"I'm on the pursuit of happiness, and I know
	// 		Everything that shine ain't always gonna be gold
	// 		Hey, I'll be fine once I get it
	// 		I'll be good"]



describe('getMatchingSnippets', () => {

	const testLyrics = `
		I'm on the pursuit of happiness, and I know
		Everything that shine ain't always gonna be gold
		Hey, I'll be fine once I get it
		I'll be good
		I'm on the pursuit of happiness, and I know
		Everything that shine ain't always gonna be gold
		Hey, I'll be fine once I get it
		I'll be good`;

	const testLyricsLines = [
		`I'm on the pursuit of happiness, and I know`,
		`Everything that shine ain't always gonna be gold`,
		`Hey, I'll be fine once I get it`,
		`I'll be good`,
		`I'm on the pursuit of happiness, and I know`,
		`Everything that shine ain't always gonna be gold`,
		`Hey, I'll be fine once I get it`,
		`I'll be good`
	];

	const testUniqueLyricsLines = [
		`I'm on the pursuit of happiness, and I know`,
		`Everything that shine ain't always gonna be gold`,
		`Hey, I'll be fine once I get it`,
		`I'll be good`
	];

	// happiness is the only matching concept
	const testConcepts = ["happiness", "sharks", "kid cudi"];

	// this tests passes
	it.skip('should split song lyrics into an array of trimmed, non-empty lines', () => {

		// split the test lyrics 
		const splitLyrics = splitLyricsByLine(testLyrics);

		// check that each line matches the correct set of lines
		for(let i = 0; i < testLyricsLines.length; i++)
			expect(splitLyrics[i]).toEqual(testLyricsLines[i]);
	});


	it('should filter out any duplicate lines and return the unique lyrics lines', () => {

		const uniqueLyricsLines = getUniqueLyricsLines(testLyricsLines);

		expect(uniqueLyricsLines).toEqual(testUniqueLyricsLines);
	});


	it.skip('should return lines from the lyrics that contain concept words', () => {

		

	});
});