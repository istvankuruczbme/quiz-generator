import { createContext, Dispatch, SetStateAction } from "react";
import { UserProfile } from "../../features/user/types/userTypes";

type UserContextType = {
	user: UserProfile | null;
	setUser: Dispatch<SetStateAction<UserProfile | null>>;
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
	updateUserState: () => Promise<void>;
};
const UserContext = createContext<UserContextType>({
	user: null,
	setUser: () => {},
	loading: true,
	setLoading: () => {},
	updateUserState: async () => {},
});

export default UserContext;
