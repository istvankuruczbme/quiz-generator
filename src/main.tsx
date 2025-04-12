import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App.tsx";
import { UserProvider } from "./contexts/UserContext/UserProvider.tsx";
import FeedbackProvider from "./features/feedback/contexts/FeedbackContext/FeedbackProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<FeedbackProvider>
				<UserProvider>
					<App />
				</UserProvider>
			</FeedbackProvider>
		</BrowserRouter>
	</StrictMode>
);
