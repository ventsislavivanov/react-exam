import useAsync from "../useAsync.js";
import { getInTheaterMovies  } from "../../services/movieServices.js";

export function useInTheaterMovies() {
	return useAsync(getInTheaterMovies , [], { initialData: [] });
}