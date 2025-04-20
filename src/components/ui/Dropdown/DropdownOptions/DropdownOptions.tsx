import { FC, HTMLAttributes } from "react";
import useDropdown from "../../../../contexts/DropdownContext/useDropdown";
import addPropClassName from "../../../../utils/addPropClassName";
import "./DropdownOptions.css";

type DropdownOptionsProps = HTMLAttributes<HTMLUListElement>;

const DropdownOptions: FC<DropdownOptionsProps> = ({ className, children }) => {
	// #region Hooks
	const { showOptions } = useDropdown();
	// #endregion

	if (!showOptions) return null;
	return <ul className={`dropdownOptions${addPropClassName(className)}`}>{children}</ul>;
};

export default DropdownOptions;
