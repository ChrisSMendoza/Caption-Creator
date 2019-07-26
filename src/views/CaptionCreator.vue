<template>
  
	<main class="columns">

		<div class="column">
			<!-- <img class="preview-img" :src="imageObjUrl"> -->
			<img src="cartoon.jpg"> <!-- DEV: static image -->
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

			
				<div class="overflow-y-scroll vh-80">
					<!-- the active concept's lyrics view -->
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
import { clarifaiClient, clarifaiApp } from '../apis/clarifai/Clarifai.js';
import request from 'superagent';

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

			currentConceptIdx: 0
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

		getLyricsForImage: function (event) {
			// TODO: check the file is an image

			this.previewImage(event.target.files[0]);

			// actual API call
			// clarifaiApp.models.predict(clarifaiClient.GENERAL_MODEL, staticImageUrl)
			// 	.then(res => console.log(res)) // set concepts
			// 	.catch(err => console.log(err));

			this.concepts.forEach(concept => {

				request
					.get(`http://localhost:8086/lyrics/${concept.name}`)
					.then(res => concept.music = res.body)
					.catch(err => console.error(err));
			});
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