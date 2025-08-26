import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import FeedbackProvider from "./features/ui/feedback/contexts/FeedbackContext/FeedbackProvider.tsx";
import { UserProvider } from "./contexts/UserContext/UserProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/queryClient.ts";
import App from "./components/App.tsx";
import "./index.css";
import AuthProvider from "./features/auth/contexts/AuthContext/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<UserProvider>
						<FeedbackProvider>
							<App />
						</FeedbackProvider>
					</UserProvider>
				</AuthProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
);
