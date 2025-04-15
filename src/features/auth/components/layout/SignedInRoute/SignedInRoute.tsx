import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../../../../contexts/UserContext/useUser";

const SignedInRoute: FC = () => {
	//#region Hooks
	const { user, loading } = useUser();
	//#endregion

	// Check if there is a user signed in
	if (user == null && !loading) return <Navigate to="/unauthorized" replace />;

	return <Outlet />;
};

export default SignedInRoute;
