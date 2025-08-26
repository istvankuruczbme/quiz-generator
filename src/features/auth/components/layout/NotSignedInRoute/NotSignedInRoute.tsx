import { FC } from "react";
import "./NotSignedInRoute.css";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../contexts/AuthContext/useAuth";

const NotSignedInRoute: FC = () => {
	//#region Hooks
	const { session } = useAuth();
	//#endregion

	// There is a user
	if (session) return <Navigate to="/" replace />;

	// No user
	return <Outlet />;
};

export default NotSignedInRoute;
