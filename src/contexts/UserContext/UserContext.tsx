import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../../features/user/types/userTypes";

type UserContextType = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
	refresh: boolean;
	setRefresh: Dispatch<SetStateAction<boolean>>;
};
const UserContext = createContext<UserContextType>({
	user: null,
	setUser: () => {},
	loading: true,
	setLoading: () => {},
	refresh: true,
	setRefresh: () => {},
});

export default UserContext;
