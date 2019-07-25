<template>
  
	<main>
		<input type="file" @change="getConceptsForImage">
		<img class="preview-img" :src="imageObjUrl">
	</main>

</template>


<script>
import { clarifaiClient, clarifaiApp } from '../apis/clarifai/Clarifai.js';
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

		// actual API call
		// clarifaiApp.models.predict(clarifaiClient.GENERAL_MODEL, staticImageUrl)
		// 	.then(res => console.log(res))
		// 	.catch(err => console.log(err));
	},

	methods: {
		getTopNConceptsFromResponse: function (response, n) {

			const { concepts } = response.outputs[0].data;
			return concepts.splice(0, n);
		},

		getConceptsForImage: function (event) {
			this.previewImage(event.target.files[0]);

						
		},

		previewImage: function (file) {
			// TODO: check the file is an image

			this.imageObjUrl = window.URL.createObjectURL(file);
		}


	}

};

</script>

<style>
.preview-img {
	width: 50vw;
	height: auto;
}
</style>