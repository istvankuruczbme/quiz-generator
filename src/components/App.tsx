import { Route, Routes } from "react-router-dom";
// Components
import SignedInRoute from "../features/auth/components/layout/SignedInRoute/SignedInRoute";
import ChangeSubscription from "../features/subscription/pages/ChangeSubscription/ChangeSubscription";
import SelectCategories from "../features/category/pages/SelectCategories/SelectCategories";
import NotSignedInRoute from "../features/auth/components/layout/NotSignedInRoute/NotSignedInRoute";
import SignIn from "../features/auth/pages/SignIn/SignIn";
import SignUp from "../features/auth/pages/SignUp/SignUp";
import ResetPassword from "../features/auth/pages/ResetPassword/ResetPassword";
import Home from "../pages/Home/Home";
import Profile from "../features/user/pages/Profile/Profile";
import ChangeEmail from "../features/user/pages/ChangeEmail/ChangeEmail";
import ChangePassword from "../features/user/pages/ChangePassword/ChangePassword";
// Hooks
import useAuth from "../features/auth/hooks/useAuth";
// CSS
import "./App.css";

function App() {
	//#region Hooks
	useAuth();
	// #endregion

	return (
		<>
			<Routes>
				<Route element={<SignedInRoute />}>
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/change-email" element={<ChangeEmail />} />
					<Route path="/profile/change-password" element={<ChangePassword />} />
					<Route path="/profile/subscription" element={<ChangeSubscription />} />
					<Route path="/profile/categories" element={<SelectCategories />} />
				</Route>

				<Route element={<NotSignedInRoute />}>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/reset-password" element={<ResetPassword />} />
				</Route>

				<Route path="/" element={<Home />} />
				<Route path="*" element={<h1>Page not found</h1>} />
			</Routes>
		</>
	);
}

export default App;
