
import CaptionCreator from '@/views/CaptionCreator.vue';
import { mount } from '@vue/test-utils';

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

	const ccWrapper = mount(CaptionCreator);



	it.skip('should be created properly', () => {

		expect(ccWrapper).toBeDefined(); // wrapper was set
		expect(ccWrapper.vm).toBeDefined(); // the wrapper contains vue properties
	});



	it.skip('should contain lyrics', () => {

			expect(ccWrapper.vm.lyrics).toBe(testLyrics);
	});



	it('should split song lyrics into an array of lines', () => {

		// split the test lyrics 
		let cmpSplitLyrics = ccWrapper.vm.splitLyricsLines(testLyrics);

		// the split lyrics should have been returned
		expect(cmpSplitLyrics).toBeDefined();

		// check that each line matches
		for(let i = 0; i < testLyricsLines.length; i++)
			expect(cmpSplitLyrics[i]).toEqual(testLyricsLines[i]);

	});



});