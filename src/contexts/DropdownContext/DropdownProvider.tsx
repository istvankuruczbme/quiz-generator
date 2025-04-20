import { FC, ReactNode, useState } from "react";
import DropdownContext from "./DropdownContext";

type DropdownProviderProps = {
	children: ReactNode;
};

const DropdownProvider: FC<DropdownProviderProps> = ({ children }) => {
	// #region States
	const [showOptions, setShowOptions] = useState(false);
	// #endregion

	return (
		<DropdownContext.Provider value={{ showOptions, setShowOptions }}>
			{children}
		</DropdownContext.Provider>
	);
};

export default DropdownProvider;
