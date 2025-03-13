import { FC, ReactNode, useState } from "react";
import UserContext from "./UserContext";
import { User } from "../../features/user/types/userTypes";

type UserProviderProps = {
	children: ReactNode;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
	// #region States
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [refresh, setRefresh] = useState(true);
	// #endregion

	return (
		<UserContext.Provider value={{ user, setUser, loading, setLoading, refresh, setRefresh }}>
			{children}
		</UserContext.Provider>
	);
};
