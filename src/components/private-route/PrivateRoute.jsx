import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function PrivateRoute({ children }) {
	const isLogin = useSelector((state) => state.auth.success);

	if (!isLogin) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
