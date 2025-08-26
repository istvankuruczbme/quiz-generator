import { PropsWithChildren } from "react";
import UserContext from "./UserContext";
import useGetUser from "../../features/user/hooks/useGetUser";

export const UserProvider = ({ children }: PropsWithChildren) => {
	// #region Hooks
	const { user, loading } = useGetUser();
	// #endregion

	return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
};
