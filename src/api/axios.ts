import axios from 'axios';

export const back_url = import.meta.env.VITE_BACK_URL;

export const api = axios.create({
	baseURL: back_url,
	headers: {
		'Content-Type': 'application/json',
		accept: '*/*',
	},
});

export const apiFormData = axios.create({
	baseURL: back_url,
	headers: {
		'Content-Type': 'multipart/form-data',
		accept: '*/*',
	},
});
