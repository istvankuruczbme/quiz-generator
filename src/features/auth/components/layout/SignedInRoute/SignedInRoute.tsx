import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../contexts/AuthContext/useAuth";

const SignedInRoute: FC = () => {
	//#region Hooks
	const { session, loading } = useAuth();
	//#endregion

	// Check if there is a user signed in
	if (!session && !loading) return <Navigate to="/sign-in" replace />;

	return <Outlet />;
};

export default SignedInRoute;
