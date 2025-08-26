import { Session } from "@supabase/supabase-js";
import { createContext, Dispatch, SetStateAction } from "react";

type AuthContextType = {
	session: Session | null;
	setSession: Dispatch<SetStateAction<Session | null>>;
	loading: boolean;
};
const AuthContext = createContext<AuthContextType>({
	session: null,
	setSession: () => null,
	loading: false,
});

export default AuthContext;
