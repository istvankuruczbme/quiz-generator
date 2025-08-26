import { PropsWithChildren } from "react";
import useAuthStateChange from "../../hooks/useAuthStateChange";
import AuthContext from "./AuthContext";

function AuthProvider({ children }: PropsWithChildren) {
	//#region Hooks
	const { session, setSession, loading } = useAuthStateChange();
	//#endregion

	return (
		<AuthContext.Provider value={{ session, setSession, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
