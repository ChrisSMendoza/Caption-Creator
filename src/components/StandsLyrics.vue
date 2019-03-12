<template>
	<div>We're grabbing lyrics..</div>
</template>



<script>
import request from 'superagent'; // http requests, query strings

import standsLyrics from '@/apis/StandsLyrics.js';

export default {
	
	name: "StandsLyrics",

	data() {
		return {
			// dev, this is will be based off user input
			lyricRequest: {
				songName: "Rose Golden",
				artistName: "Kid Cudi"
			},
			lyricsApi: standsLyrics,
			lyricsLinks: [] // potential urls for the requested song lyrics
		}
	}
};
</script>



<style>
	

</style>