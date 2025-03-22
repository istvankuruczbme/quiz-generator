import { FC, ReactNode, useState } from "react";
import UserContext from "./UserContext";
import { User } from "../../features/user/types/userTypes";
import getUser from "../../features/user/services/getUser";
import getAuthToken from "../../features/auth/services/getAuthToken";

type UserProviderProps = {
	children: ReactNode;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
	// #region States
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Functions
	async function updateUserState(): Promise<void> {
		// Check user
		if (user == null) return;

		setLoading(true);

		try {
			// Get token
			const token = await getAuthToken();

			// Get user from DB
			const updatedUser = await getUser(user.id, token);

			// Update states
			setUser(updatedUser);
			setLoading(false);
		} catch (err) {
			console.log("Error fetching user from DB.", err);
			setLoading(false);
		}
	}
	//#endregion

	return (
		<UserContext.Provider value={{ user, setUser, loading, setLoading, updateUserState }}>
			{children}
		</UserContext.Provider>
	);
};
