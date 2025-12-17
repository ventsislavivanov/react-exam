import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoritesService';

export const loadFavorites = createAsyncThunk('favorites/load', async (uid) => {
	return await getFavorites(uid);
});

export const addFavoriteThunk = createAsyncThunk('favorites/add', async ({ uid, movie }) => {
	await addFavorite(uid, movie);
	return { movie };
});

export const removeFavoriteThunk = createAsyncThunk('favorites/remove', async ({ uid, movieId }) => {
	await removeFavorite(uid, movieId);
	return { movieId };
});

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: { items: [], loading: false, error: null },
	reducers: {
		setFavorites(state, action) { state.items = action.payload; },
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadFavorites.pending, (state) => {
				state.loading = true; state.error = null;
			})
			.addCase(loadFavorites.fulfilled, (state, action) => {
				state.items = action.payload;
				state.loading = false;
			})
			.addCase(loadFavorites.rejected, (state, action) => {
				state.loading = false; state.error = action.error?.message || 'Failed to load favorites';
			})
			.addCase(addFavoriteThunk.fulfilled, (state, action) => {
				const movie = action.payload.movie;
				const movieId = String(movie.id ?? movie.movieId);
				if (!state.items.some(x => String(x.movieId) === movieId)) {
					state.items.push({
						movieId: Number(movieId),
						title: movie.title,
						poster_path: movie.poster_path,
						vote_average: movie.vote_average ?? null,
					});
				}
			})
			.addCase(removeFavoriteThunk.fulfilled, (state, action) => {
				state.items = state.items.filter(x => String(x.movieId) !== String(action.payload.movieId));
			});
	}
});

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesLoading = (state) => state.favorites.loading;
export const selectFavoritesError = (state) => state.favorites.error;