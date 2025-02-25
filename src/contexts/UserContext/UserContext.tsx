import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../../types/user";

type UserContextType = {
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
};
const UserContext = createContext<UserContextType>({ user: null, setUser: () => {} });

export default UserContext;
