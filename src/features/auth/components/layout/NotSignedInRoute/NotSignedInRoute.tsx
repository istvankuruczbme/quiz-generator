import { FC } from "react";
import useUser from "../../../../../contexts/UserContext/useUser";
import "./NotSignedInRoute.css";
import { Outlet } from "react-router-dom";

const NotSignedInRoute: FC = () => {
	//#region Hooks
	const { user, loading } = useUser();
	//#endregion

	// Check if there is no user signed in
	if (user != null && !loading) return null;

	return <Outlet />;
};

export default NotSignedInRoute;
