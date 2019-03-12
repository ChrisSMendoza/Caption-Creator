
import { API_KEY } from './ClarifaiConfig.js';
import Clarifai from 'clarifai'; // Clarifai client

export default new Clarifai.App({
	apiKey: API_KEY
});