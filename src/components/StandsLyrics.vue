<template>
	
</template>



<script>
import request from 'superagent'; // http requests, query strings

import standsLyrics from '@/apis/StandsLyrics.js';

export default {
	
	name: "StandsLyrics",

	data() {
		return {
			lyricsLinks: [] // potential urls for the requested song lyrics
		}
	}

	mount() {

	}

};
</script>



<style>
	

</style>