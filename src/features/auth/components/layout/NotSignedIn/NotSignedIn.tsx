import { FC, ReactNode } from "react";
import "./NotSignedIn.css";
import useUser from "../../../../../contexts/UserContext/useUser";

type NotSignedInProps = {
	children: ReactNode;
};

const NotSignedIn: FC<NotSignedInProps> = ({ children }) => {
	//#region Hooks
	const { user, loading } = useUser();
	//#endregion

	// Check if there is no user signed in
	if (user != null && !loading) return null;

	return children;
};

export default NotSignedIn;
