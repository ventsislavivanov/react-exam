import useAsync from "../useAsync.js";
import { getDramaMovies } from "../../services/movieServices.js";

export function useDramaMovies() {
	return useAsync(getDramaMovies, [], { initialData: [] });
}