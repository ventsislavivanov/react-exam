import { Route, Routes } from "react-router";

function App() {

	return (
		<>
			<h1>test</h1>
			<Routes>
				<Route path="/" element={<h2>Home</h2>} />
			</Routes>
		</>
	)
}

export default App
