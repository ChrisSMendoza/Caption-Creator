
import CaptionCreator from '@/views/CaptionCreator.vue';
import { mount } from '@vue/test-utils';

describe('CaptionCreator.vue', () => {

	const ccWrapper = mount(CaptionCreator);

	it('should be created properly', () => {

		expect(ccWrapper).toBeDefined(); // wrapper was set
		expect(ccWrapper.vm).toBeDefined(); // the wrapper contains vue properties
	});



	it('should contain lyrics', () => {

		let testLyrics = `
				I'm on the pursuit of happiness, and I know
				Everything that shine ain't always gonna be gold
				Hey, I'll be fine once I get it
				I'll be good
				I'm on the pursuit of happiness, and I know
				Everything that shine ain't always gonna be gold
				Hey, I'll be fine once I get it
				I'll be good
			`
			expect(ccWrapper.vm.lyrics).toBe(testLyrics);
	});



	it.skip('should split song lyrics into an array of lines', () => {

	});



});