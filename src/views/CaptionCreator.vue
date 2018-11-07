<template>
  
	<main>
		Caption Creator
		

	</main>

</template>


<script>

export default {

	name: "CaptionCreator",

	data() {
		return {

			// test data: user enters images and we receive concepts for each
			clarifaiResponse: [
				{
					data: {
						concepts: ["Man", "Rap", "Car", "Road", "City"]
					}
				},
				{
					data: {
						concepts: ["Man", "Rap", "Car", "Road", "City"]
					}					
				}
			],
			// test data: will be full set of lyrics
			lyrics: `
				I'm on the pursuit of happiness, and I know
				Everything that shine ain't always gonna be gold
				Hey, I'll be fine once I get it
				I'll be good
				I'm on the pursuit of happiness, and I know
				Everything that shine ain't always gonna be gold
				Hey, I'll be fine once I get it
				I'll be good
			`,
		}
	},

	methods: {

		// finds concept words inside of lyrics
		// could return several snippets with 2, 4, 6, .. lines
		searchLyrics(lyrics) {

		},

		// splits long string of lyrics into lines at each index of an array
		splitLyricsLines(rawLyrics) {

			let cleanLines = []; // non empty strings without leading or trailing whitespace
			let rawLines = rawLyrics.split('\n'); // grab anything ending with a newline

			rawLines.forEach(line => {

				// it's a non-empty string
				if(line.length > 0) {
					
					// remove leading or trailing whitespace
					cleanLines.push(line.trim());
				}
			});
			return cleanLines;
		},

		// grabs every unique word and its line number(s) from the lyrics
		// and places it into a map
		indexLyrics(lyricsLines) {

			let indexedLyrics = new Map();

			lyricsLines.forEach((line, currLineNum) => {

				let words = line.split(" "); // grab the current line's words

				words.forEach(word => {

					// remove any non-alphanumeric characters except apostraphes
					word = word.replace(/([^a-zA-Z0-9'])/g, "");

					// the word is already indexed
					if(indexedLyrics.has(word)) {

						let lineNums = indexedLyrics.get(word);
						lineNums.push(currLineNum); // add the new found line number

						indexedLyrics.set(word, lineNums); // update the word's line index
					}
					else {
						indexedLyrics.set(word, [currLineNum]); // the word is now indexed
					}
				});
			});
			return indexedLyrics;
		},

		// NOTE: name not final
		// grabs the set of lyrics data that will be searched for
		// can't be too many, so need to refine search
		// OR could be a lot, but done asyncly or over a server 

		// parameters: 
		// @lyricsQuery properties of songs to use
		// 	genre, year(s), etc.

		// returns or sets the pool of lyrics data
		getAllLyrics(lyricsQuery) {

		}

	}

};



				// Mmmm, ay-oh
				// Hey... Ratatat, yeah!
				// Na-na-na-nah
				// Na-na-na-nah

				// Crush a bit, little bit, roll it up, take a hit
				// Feeling lit, feeling right, 2 AM, summer night
				// I don't care, hand on the wheel
				// Driving drunk, I'm doing my thing
				// Rolling in the Midwest side and out
				// Living my life, getting out dreams
				// People told me slow my roll, I'm screaming out "Fuck that"
				// I'mma do just what I want, looking ahead, no turning back
				// If I fall, if I die, know I lived it to the fullest
				// If I fall, if I die, know I lived and missed some bullets

				// I'm on the pursuit of happiness, and I know
				// Everything that shine ain't always gonna be gold
				// Hey, I'll be fine once I get it
				// I'll be good
				// I'm on the pursuit of happiness and I know
				// Everything that shine ain't always gonna be gold
				// Hey, I'll be fine once I get it
				// I'll be good

				// Tell me what you know about dreaming, dreaming?
				// You don't really know about nothing, nothing
				// Tell me what you know about them night terrors every night
				// 5 AM, cold sweats, waking up to the sky?
				// Tell me what you know about dreams, dreams?
				// Tell me what you know about night terrors? Nothing
				// You don't really care about the trials of tomorrow
				// Rather lay awake in the bed full of sorrow

				// I'm on the pursuit of happiness, and I know
				// Everything that shine ain't always gonna be gold
				// Hey, I'll be fine once I get it
				// I'll be good
				// I'm on the pursuit of happiness, and I know
				// Everything that shine ain't always gonna be gold
				// Hey, I'll be fine once I get it
				// I'll be good

				// I'm on the pursuit of happiness
				// I know everything that shine ain't always gold
				// I'll be fine once I get it
				// I'll be good

				// I'm on the pursuit of happiness, and I know
				// Everything that shine ain't always gonna be gold
				// Hey, I'll be fine once I get it
				// I'll be good
				// I'm on the pursuit of happiness, and I know
				// Everything that shine ain't always gonna be gold
				// Hey, I'll be fine once I get it
				// I'll be good

				// Pursuit of happiness, yeah
				// I gon' get it, I'll be good
				// Oh... oh man, oh, ugh
				// Room's spinning, room's spinning
				// Pat, Zuli...
				// Oh fuck, oh my God
				// Why'd I drink so much and smoke so much? Oh
				// Oh, fuck
</script>

<style>

</style>