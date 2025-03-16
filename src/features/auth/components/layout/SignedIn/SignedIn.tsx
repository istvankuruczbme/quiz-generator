import { FC, ReactNode } from "react";
import useUser from "../../../../../contexts/UserContext/useUser";
import "./SignedIn.css";

type SignedInProps = {
	children: ReactNode;
};

const SignedIn: FC<SignedInProps> = ({ children }) => {
	//#region Hooks
	const { user, loading } = useUser();
	//#endregion

	// Check if there is a user signed in
	if (user == null && !loading) return null;

	return children;
};

export default SignedIn;
