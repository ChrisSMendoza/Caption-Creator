
import { API_KEY } from './ClarifaiConfig.js';
import Clarifai from 'clarifai'; // contains constants like model.GENERAL_MODEL

export const clarifaiClient = Clarifai;

export const clarifaiApp = new Clarifai.App({
	apiKey: API_KEY
});