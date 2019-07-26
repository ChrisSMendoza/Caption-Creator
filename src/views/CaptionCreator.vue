<template>
  
	<main>

		<input type="file" @change="getLyricsForImage">

		<img class="preview-img" :src="imageObjUrl">

		<div class="tabs">
		 	<ul>
		    	<li v-for="(concept, idx) in concepts"
		    		:class="{ 'is-active': isActive(idx) }"
		    	>
		    		<a @click="makeActive(idx)">{{concept.name}}</a>
		    	</li>
		  	</ul>
		</div>

		<!-- the active concept's lyrics -->
		<section>
			<div v-for="(concept, idx) in concepts"
				v-show="isActive(idx)">

				<!-- scroll down view of all songs that matched this concept -->
				
				<Lyrics 
					v-for="music in concept.music"
					:songName="music.song"
					:artistName="music.artist"
					:lyrics="music.lyrics"
				/>
				

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
.preview-img {
	width: 50vw;
	height: auto;
}
.has-bg-trans {
	background-color: transparent;
}

.nav-btn {
	background-color: transparent;
	border: none;
}
</style>