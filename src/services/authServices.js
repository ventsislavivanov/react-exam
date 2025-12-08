import axiosTheMovieDb from "../configs/axios.js";
import { apiKey } from "../configs/api.js";

export async function generationRequestToken() {
	try {
		const response = await axiosTheMovieDb.get(`authentication/token/new?${apiKey}`);
		return response.data; // { success, expires_at, request_token }
	} catch (e) {
		console.error('Oops unexpected', e);
		return [];
	}
}

export async function buildAuthUrl(requestToken, returnUrl) {
	const baseApproved = 'http://localhost:5173/approved';
	const approvedWithReturn = returnUrl
		? `${baseApproved}?returnUrl=${encodeURIComponent(returnUrl)}`
		: baseApproved;
	return `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(approvedWithReturn)}`;
}

export async function createSession(requestToken) {
	try {
		const response = await axiosTheMovieDb.post(`authentication/session/new?${apiKey}`, {
			request_token: requestToken,
		});
		return response.data; // { success, session_id }
	} catch (e) {
		console.error('Oops unexpected', e);
		return [];
	}
}

export async function deleteSession(sessionId) {
	try {
		const response = await axiosTheMovieDb.delete(`authentication/session?${apiKey}`, {
			data: { session_id: sessionId },
		});

		if (response.data.success) {
			console.log('Session deleted successfully.');
		} else {
			console.error('Failed to delete session:', response.data);
		}

		return response.data;
	} catch (e) {
		console.error('Oops unexpected', e);
		return [];
	}
}

export function  getToken() {
	return "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2U1MTM1NzA4NjlhNTJiNzI1NTRhNThjMGQ3OTI0OCIsIm5iZiI6MTczNjE1NDY4Mi40ODgsInN1YiI6IjY3N2I5ZTNhZDliMGU3MGQ1ZDcyNDcwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IEFrQNmFDvlOqsGtAAkguAd_xbXyQiZpB_59XUJMrvw";
}
