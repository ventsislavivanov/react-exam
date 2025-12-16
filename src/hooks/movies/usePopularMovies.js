import useAsync from "../useAsync.js";
import { getPopularMovies } from "../../services/movieServices.js";

export function usePopularMovies() {
	return useAsync(getPopularMovies, [], { initialData: [] });
}