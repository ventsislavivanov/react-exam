import axiosTheMovieDb from "../configs/axios.js";
import { apiKey } from "../configs/api.js";

const accountId = 21732660;

export async function toggleFavoriteMovie(movieId, sessionId, favorite) {
	try {
    const response = await axiosTheMovieDb.post(`account/${accountId}/favorit?${apiKey}&session_id=${sessionId}`, {
		media_type: 'movie',
		media_id: movieId,
		favorite
    });
    	return response.data.results;
	}
	catch (e) {
    	console.error('Oops unexpected', e);
    	return [];
	}
}

export async function loadFavoriteMovie(sessionId) {
	try {
		const response = await axiosTheMovieDb.get(`account/${accountId}/favorite/movies?${apiKey}&session_id=${sessionId}`);
    	return response.data.results;
	}
	catch (e) {
    	console.error('Oops unexpected', e);
    	return [];
	}
}
