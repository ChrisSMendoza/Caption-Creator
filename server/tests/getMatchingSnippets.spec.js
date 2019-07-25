
const { 
	getConceptsWithLineNumbers, 
	getUniqueLyricsLines, 
	splitLyricsByLine 
} = require('../getMatchingSnippets.js');
	// tests for: 
	// 	function getMatchingSnippets(rawLyrics)

	// input - @rawLyrics: a long string of lyrics (contains new lines)

	// output - @snippets: a set of strings that contain the search term
	//
	//[
	// 		"I'm on the pursuit of happiness, and I know
	// 		Everything that shine ain't always gonna be gold",

	// 		"I'm on the pursuit of happiness, and I know
	// 		Everything that shine ain't always gonna be gold
	// 		Hey, I'll be fine once I get it
	// 		I'll be good"]
const getExpectedConceptLineMappings = () => {

	let expectedConceptLineMappings = new Map();

	expectedConceptLineMappings.set("happiness", [0, 4]);
	expectedConceptLineMappings.set("shine", [1, 5]);

	return expectedConceptLineMappings;
};


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

	// mock Clarifai concept words retrieved from image
	const testConceptWords = ["happiness", "shine", "sun"]; // 'sun' is not in lyrics

	it.skip('should split song lyrics into an array of trimmed, non-empty lines', () => {

		// split the test lyrics 
		const splitLyrics = splitLyricsByLine(testLyrics);

		// check that each line matches the correct set of lines
		for(let i = 0; i < testLyricsLines.length; i++)
			expect(splitLyrics[i]).toEqual(testLyricsLines[i]);
	});


	it.skip('should filter out any duplicate lines and return the unique lyrics lines', () => {

		const uniqueLyricsLines = getUniqueLyricsLines(testLyricsLines);

		expect(uniqueLyricsLines).toEqual(testUniqueLyricsLines);
	});


	it("getConceptsWithLineNumbers should return a map, each concept word is mapped to an array of line numbers", () => {

		const actualConceptLineMappings = getConceptsWithLineNumbers(testLyricsLines, testConceptWords);

		expect(actualConceptLineMappings).toEqual(getExpectedConceptLineMappings());
	});



	it.skip('should return lines from the lyrics that contain concept words', () => {

		

	});
});