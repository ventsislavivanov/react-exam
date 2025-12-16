import { useEffect, useState, useCallback } from "react";

export default function useAsync(
	asyncFn,
	deps = [],
	{ immediate = true, initialData = null} = {}
) {
	const [data, setData] = useState(initialData);
	const [loading, setLoading] = useState(immediate);
	const [error, setError] = useState(null);

	const execute = useCallback(async (...args) => {
		setLoading(true);
		setError(null);
		try {
			const result = await asyncFn(...args);
			setData(result);
			return result;
		} catch (e) {
			setError(e);
			throw e;
		} finally {
			setLoading(false);
		}
	}, deps);

	useEffect(() => {
		if (immediate) execute();
	}, [execute, immediate]);

	return { data, loading, error, execute, setData };
}