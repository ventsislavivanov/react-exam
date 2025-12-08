import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/authSlice.js";
import { createSession } from "../../../services/authServices.js";

export default function Approved() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const requestToken = searchParams.get("request_token");
		const returnUrl = searchParams.get("returnUrl");

		if (!requestToken) return;

		async function run() {
			const response = await createSession(requestToken);
			const { session_id, success } = response;

			dispatch(loginSuccess({ sessionId: session_id, success }));

			if (returnUrl) {
				navigate(returnUrl);
			} else {
				navigate("/dashboard");
			}
		}

		run();
	}, [dispatch, navigate, searchParams]);

	return null;
}
