import React from "react";
import { RingLoader } from "react-spinners";

export default function Loading({
	loading = true,
	size = 48,
	color = "#436d9a",
	fullscreen = false,
	center = true,
	className = "",
	style,
}) {
	if (!loading) return null;

	const baseWrapperStyle = center
		? { display: "flex", alignItems: "center", justifyContent: "center" }
		: {};

	const overlayStyle = fullscreen
		? {
			position: "fixed",
			inset: 0,
			background: "rgba(255, 255, 255, 0.6)",
			zIndex: 9999,
		}
		: {};

	return (
		<div
			className={className}
			style={{ padding: fullscreen ? 0 : "0.75rem", ...baseWrapperStyle, ...overlayStyle, ...style }}
			aria-busy="true"
			aria-live="polite"
			role="status"
		>
			<RingLoader size={size} color={color} speedMultiplier={1} />
		</div>
	);
}