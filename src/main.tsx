import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext/UserProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<UserProvider>
				<App />
			</UserProvider>
		</BrowserRouter>
	</StrictMode>
);
