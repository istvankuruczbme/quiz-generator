import { createContext } from "react";
import { UserProfile } from "../../features/user/types/userTypes";

type UserContextType = {
	user: UserProfile | null;
	loading: boolean;
};
const UserContext = createContext<UserContextType>({
	user: null,
	loading: true,
});

export default UserContext;
