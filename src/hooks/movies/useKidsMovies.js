import useAsync from "../useAsync.js";
import { getKidsMovies } from "../../services/movieServices.js";

export function useKidsMovies() {
	return useAsync(getKidsMovies, [], { initialData: [] });
}