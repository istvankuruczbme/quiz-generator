import { FC } from "react";
import { Outlet } from "react-router-dom";
import useUser from "../../../../../contexts/UserContext/useUser";
import "./SignedInRoute.css";

const SignedInRoute: FC = () => {
	//#region Hooks
	const { user, loading } = useUser();
	//#endregion

	// Check if there is a user signed in
	if (user == null && !loading) return null;

	return <Outlet />;
};

export default SignedInRoute;
