import { createContext, Dispatch, SetStateAction } from "react";

type DropdownContextType = {
	showOptions: boolean;
	setShowOptions: Dispatch<SetStateAction<boolean>>;
};

const DropdownContext = createContext<DropdownContextType>({
	showOptions: false,
	setShowOptions: () => {},
});

export default DropdownContext;
