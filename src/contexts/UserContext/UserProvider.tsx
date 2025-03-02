import { FC, ReactNode, useState } from "react";
import UserContext from "./UserContext";
import { User } from "../../types/user";

type UserProviderProps = {
	children: ReactNode;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
	// #region States
	const [user, setUser] = useState<User>(null);
	const [loading, setLoading] = useState(true);
	// #endregion

	return (
		<UserContext.Provider value={{ user, setUser, loading, setLoading }}>
			{children}
		</UserContext.Provider>
	);
};
