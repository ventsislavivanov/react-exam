import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router";
import './helpers/fontawesome.js';


import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/spacelab/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>
)
