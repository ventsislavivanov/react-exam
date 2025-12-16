import useAsync from "../useAsync.js";
import { getMovieDetails } from "../../services/movieServices.js";

export function useMovieDetails(id) {
	return useAsync(() => getMovieDetails(id), [id]);
}