import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../../../../contexts/UserContext/useUser";

const SubscriptionRequiredRoute = () => {
	//#region Hooks
	const { user, loading } = useUser();
	//#endregion

	// No user with subscription
	if (user != null && !loading && user.hasSubscription === false) {
		return <Navigate to="/error/subscription-required" replace />;
	}

	return <Outlet />;
};

export default SubscriptionRequiredRoute;
