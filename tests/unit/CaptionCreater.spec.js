
import CaptionCreator from '@/views/CaptionCreator.vue';
import { mount } from '@vue/test-utils';

let getTestLyricsMap = () => {

	let uniqueWords = [
		"I'm", "on", "the", "pursuit", "of", "happiness", "and", "I",
		"know","Everything","that","shine","ain't", "always", "gonna",
		"be","gold","Hey","I'll","fine","once","get","it","good"
	];
	let eachWordsLineNums = [
		[0, 4], [0, 4], [0, 4], [0, 4], [0, 4], [0, 4], [0, 4], 
		[0, 2, 4, 6], [0, 4], [1, 5], [1, 5], [1, 5], [1, 5], [1, 5],
		[1, 5], [1, 2, 3, 5, 6, 7], [1, 5], [2, 6], [2, 3, 6, 7], [2, 6],
		[2, 6], [2, 6], [2, 6], [3, 7]
	];
	let testLyricsMap = new Map();

	uniqueWords.forEach((word, i) => {

		testLyricsMap.set(word, eachWordsLineNums[i]);
	});
	return testLyricsMap;
};

describe('CaptionCreator.vue', () => {

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

	// happiness is the only matching concept
	const testConcepts = ["happiness", "sharks", "kid cudi"];

	const ccWrapper = mount(CaptionCreator);



	it.skip('should be created properly', () => {

		expect(ccWrapper).toBeDefined(); // wrapper was set
		expect(ccWrapper.vm).toBeDefined(); // the wrapper contains vue properties
	});


	it.skip('should contain lyrics', () => {

			expect(ccWrapper.vm.lyrics).toBe(testLyrics);
	});


	it.skip('should split song lyrics into an array of lines', () => {

		// split the test lyrics 
		let cmpSplitLyrics = ccWrapper.vm.splitLyricsLines(testLyrics);

		// the split lyrics should have been returned
		expect(cmpSplitLyrics).toBeDefined();

		// check that each line matches
		for(let i = 0; i < testLyricsLines.length; i++)
			expect(cmpSplitLyrics[i]).toEqual(testLyricsLines[i]);
	});


	it.skip('should place words and their line numbers into a map', () => {

		let indexedLyrics = ccWrapper.vm.indexLyrics(testLyricsLines);
		let testLyricsMap = getTestLyricsMap();

		expect(indexedLyrics).toEqual(testLyricsMap);
	});


	it('should return lines from the lyrics that contain concept words', () => {

		

	});

});