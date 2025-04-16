import { FC, ReactNode, useState } from "react";
import HeaderSidebarContext from "./HeaderSidebarContext";

type HeaderSidebarProviderProps = {
	children: ReactNode;
};

const HeaderSidebarProvider: FC<HeaderSidebarProviderProps> = ({ children }) => {
	// #region States
	const [show, setShow] = useState(false);
	// #endregion

	return (
		<HeaderSidebarContext.Provider value={{ show, setShow }}>
			{children}
		</HeaderSidebarContext.Provider>
	);
};

export default HeaderSidebarProvider;
