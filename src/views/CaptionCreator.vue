<template>
  
	<main class="columns">

		<div class="column">
			<img :src="imageObjUrl">
			<input type="file" @change="getLyricsForImage">
		</div>
		
		<section class="column is-8">

			<!-- tabs for each concept -->
			<div class="tabs">
			 	<ul>
			    	<li v-for="(concept, idx) in concepts"
			    		:class="{ 'is-active': isActive(idx) }"
			    	>
			    		<a @click="makeActive(idx)">{{concept.name}}</a>
			    	</li>
			  	</ul>
			</div>

			<!-- the active concept's lyrics view -->
			<div class="overflow-y-scroll vh-80">
				<!-- scroll down to see songs that matched concept -->
				<div v-for="(concept, idx) in concepts"
					v-show="isActive(idx)"
					class="m-2">
					
					<Lyrics 
						v-for="music in concept.music"
						:key="music.artist"
						:songName="music.song"
						:artistName="music.artist"
						:lyrics="music.lyrics"
					/>
				</div>
			</div>
			
		</section>

	</main>

</template>


<script>
import request from 'superagent';

import { clarifaiClient, clarifaiApp } from '../apis/clarifai/Clarifai.js';
import s3 from '../apis/s3/s3.js';

import Lyrics from '../components/Lyrics';

import clarifaiMockResponse from '../apis/clarifai/ClarifaiMockResponse.js';
import mockConceptsAndLyrics from '../mocks/ConceptsAndLyrics.js';

export default {

	name: "CaptionCreator",

	components: {
		Lyrics
	},

	data() {
		return {
			clarifaiApp: clarifaiApp, //DEV, show the imported object

			concepts: mockConceptsAndLyrics, // DEV: mock data for now, really from Clarifai API and my API

			imageObjUrl: null, // from user input, converted to be previewed

			currentConceptIdx: 0,

			clarifaiResponse: null, // DEV: API response for viewing in console
			actualConcepts: []
		}
	},

	mounted() {

		const staticImageUrl = "https://i.postimg.cc/sDhKPPQt/waterfall.jpg";
	},

	methods: {
		getTopNConceptsFromResponse: function (response, n) {

			const { concepts } = response.outputs[0].data;
			return concepts.splice(0, n);
		},

		getLyricsForImage: async function (event) {
			// TODO: check the file is an image
			let file = event.target.files[0];
			let imageUrl = s3.getImageUrlFromFilename(file.name);
			let numConceptsToConsider = 5;

			this.previewImage(file);

			try {
				await s3.upload(file); // wait for s3 to upload the image
				
				// get AI predicted concepts from uploaded image
				let clarifaiResponse = await clarifaiApp.models.predict(clarifaiClient.GENERAL_MODEL, imageUrl);

				// retrieve just the concepts from Clarifai response
				let concepts = this.getTopNConceptsFromResponse(clarifaiResponse, numConceptsToConsider);
			}
			catch(err) {
				console.error(`getLyricsForImage: ${err}`);
			}

			// this.concepts.forEach(concept => {

			// 	request
			// 		.get(`http://localhost:8086/lyrics/${concept.name}`)
			// 		.then(res => concept.music = res.body)
			// 		.catch(err => console.error(err));
			// });
		},

		previewImage: function (file) {
			this.imageObjUrl = window.URL.createObjectURL(file);
		},

		makeActive: function (newIdx) {
			this.currentConceptIdx = newIdx;
		},

		isActive: function (idx) {
			return (this.currentConceptIdx === idx);
		}
	},


};

</script>

<style>


</style>