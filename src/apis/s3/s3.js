import { bucketUrl } from './s3Config.js';
import request from 'superagent'; // http POST

function getImageUrlFromFilename (filename) {
	return `${this.bucketUrl}/${filename}`;
}

function upload(file) {
	    
    let formData = new FormData();
    formData.append('key', file.name);
    formData.append('acl', 'bucket-owner-full-control');
    formData.append('Content-Type', file.type);
    formData.append("file", file);

    return request.post(this.bucketUrl).send(formData);
}

// s3 API object
export default {
	bucketUrl,
	getImageUrlFromFilename,
	upload
};