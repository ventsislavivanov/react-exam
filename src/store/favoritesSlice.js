import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadFavoriteMovie, toggleFavoriteMovie } from "../services/accountServices.js";

const initialState = {
	items: [],
	loading: false,
	error: null,
};

export const loadFavorites = createAsyncThunk(
	"favorites/load",
	async (_, { getState, rejectWithValue }) => {
		try {
			const sessionId = getState().auth.sessionId;
			if (!sessionId) return [];

			const items = await loadFavoriteMovie(sessionId);

			return items || [];
		} catch (e) {
			return rejectWithValue(e?.message || "Failed to load favorites");
		}
	}
);

export const toggleFavorite = createAsyncThunk(
	"favorites/toggle",
	async ({ movie, favorite }, { getState, rejectWithValue }) => {
		try {
			const sessionId = getState().auth.sessionId;
			if (!sessionId) {
				throw new Error("No session");
			}

			await toggleFavoriteMovie(movie.id, sessionId, favorite);

			return { movie, favorite };
		} catch (e) {
			return rejectWithValue(e?.message || "Failed to toggle favorite");
		}
	}
);

const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(loadFavorites.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadFavorites.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload || [];
			})
			.addCase(loadFavorites.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || String(action.error?.message || action.error);
			})
			.addCase(toggleFavorite.fulfilled, (state, action) => {
				const { movie, favorite } = action.payload;

				if (favorite) {
					const exists = state.items.some((m) => m.id === movie.id);
					if (!exists) state.items.push(movie);
				} else {
					state.items = state.items.filter((m) => m.id !== movie.id);
				}
			});
	},
});

export default favoritesSlice.reducer;
export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesLoading = (state) => state.favorites.loading;
export const selectFavoritesError = (state) => state.favorites.error;
