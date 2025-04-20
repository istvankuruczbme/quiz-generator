import { FC, HTMLAttributes, useRef } from "react";
// Components
import DropdownButton from "./DropdownButton/DropdownButton";
import DropdownOptions from "./DropdownOptions/DropdownOptions";
import DropdownOption from "./DropdownOption/DropdownOption";
// Hooks
import useCloseDropdown from "../../../hooks/dropdown/useCloseDropdown";
// Functions
import addPropClassName from "../../../utils/addPropClassName";
// CSS
import "./Dropdown.css";

type DropdownProps = HTMLAttributes<HTMLDivElement>;
type DropdownChildren = {
	Button: typeof DropdownButton;
	Options: typeof DropdownOptions;
	Option: typeof DropdownOption;
};
type DropdownComponent = FC<DropdownProps> & DropdownChildren;

const Dropdown: DropdownComponent = ({ className, children }) => {
	// #region Refs
	const dropdownRef = useRef<HTMLDivElement>(null);
	// #endregion

	// #region Hooks
	useCloseDropdown(dropdownRef);
	//#endregion

	return (
		<div className={`dropdown${addPropClassName(className)}`} ref={dropdownRef}>
			{children}
		</div>
	);
};

Dropdown.Button = DropdownButton;
Dropdown.Options = DropdownOptions;
Dropdown.Option = DropdownOption;

export default Dropdown;
