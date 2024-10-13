import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import Home from "./pages/Home";
import Career from "./pages/Career";
import Education from "./pages/Education";
import ComingSoon from "./pages/ComingSoon";
import PageNotFound from "./pages/PageNotFound";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(
	document.getElementById("root")
);
root.render(
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/" element={<Home />} />
					<Route path="/career" element={<Career />} />
					<Route path="/education" element={<Education />} />
					<Route path="/coming-soon" element={<ComingSoon />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</Router>
	</Provider>
);
