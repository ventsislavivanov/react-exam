import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function PrivateRoute({ children }) {
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
