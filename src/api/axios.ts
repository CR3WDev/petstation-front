import axios from 'axios';

const back_url = import.meta.env.VITE_BACK_URL;

export const api = axios.create({
	baseURL: back_url,
	headers: {
		'Content-Type': 'application/json',
		accept: '*/*',
	},
});
