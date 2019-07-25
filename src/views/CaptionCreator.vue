<template>
  
	<main>

		<input type="file" @change="getLyricsForImage">

		<img class="preview-img" :src="imageObjUrl">

		<div class="tabs">
		 	<ul><!-- class="is-active" -->
		    	<li v-for="concept in concepts">
		    		<button>{{concept.name}}</button>
		    	</li>
		  	</ul>
		</div>

	</main>

</template>


<script>
import { clarifaiClient, clarifaiApp } from '../apis/clarifai/Clarifai.js';
import request from 'superagent';

import clarifaiMockResponse from '../apis/clarifai/ClarifaiMockResponse.js';

export default {

	name: "CaptionCreator",

	components: {

	},

	data() {
		return {
			clarifaiApp: clarifaiApp, //DEV, show the imported object

			concepts: null, // from Clarifai API

			imageObjUrl: null // from user input, converted to be previewed
		}
	},

	mounted() {

		const staticImageUrl = "https://i.postimg.cc/sDhKPPQt/waterfall.jpg";

		this.concepts = this.getTopNConceptsFromResponse(clarifaiMockResponse, 5);
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
		}	
	},


};

</script>

<style>
.preview-img {
	width: 50vw;
	height: auto;
}
</style>