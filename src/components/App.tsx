import { Route, Routes } from "react-router-dom";
// Components
import NotSignedInRoute from "../features/auth/components/layout/NotSignedInRoute/NotSignedInRoute";
import SignIn from "../features/auth/pages/SignIn/SignIn";
import SignUp from "../features/auth/pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
// Hooks
import useAuth from "../features/auth/hooks/useAuth";
// CSS
import "./App.css";
import SignedInRoute from "../features/auth/components/layout/SignedInRoute/SignedInRoute";
import ChangeSubscription from "../features/subscription/pages/ChangeSubscription/ChangeSubscription";
import ProfileCategories from "../features/user/pages/ProfileCategories/ProfileCategories";

function App() {
	//#region Hooks
	useAuth();
	// #endregion

	return (
		<>
			<Routes>
				<Route element={<SignedInRoute />}>
					<Route path="/profile/subscription" element={<ChangeSubscription />} />
					<Route path="/profile/categories" element={<ProfileCategories />} />
				</Route>

				<Route element={<NotSignedInRoute />}>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Route>

				<Route path="/" element={<Home />} />
				<Route path="*" element={<h1>Page not found</h1>} />
			</Routes>
		</>
	);
}

export default App;
