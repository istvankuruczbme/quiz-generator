import { FC, HTMLAttributes } from "react";
import useDropdown from "../../../../contexts/DropdownContext/useDropdown";
import addPropClassName from "../../../../utils/addPropClassName";
import "./DropdownButton.css";

type DropdownButtonProps = HTMLAttributes<HTMLDivElement>;

const DropdownButton: FC<DropdownButtonProps> = ({ className, children }) => {
	// #region Hooks
	const { setShowOptions } = useDropdown();
	// #endregion

	return (
		<button
			type="button"
			className={`dropdownButton${addPropClassName(className)}`}
			onClick={() => setShowOptions((show) => !show)}
		>
			{children}
		</button>
	);
};

export default DropdownButton;
