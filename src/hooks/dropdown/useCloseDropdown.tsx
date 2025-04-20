import { RefObject, useLayoutEffect } from "react";
import useDropdown from "../../contexts/DropdownContext/useDropdown";

const useCloseDropdown = (dropdownRef: RefObject<HTMLDivElement | null>) => {
	// #region Hooks
	const { showOptions, setShowOptions } = useDropdown();
	// #endregion

	useLayoutEffect(() => {
		function handleClick(e: MouseEvent) {
			// Check if dropdown options are visible
			if (!showOptions) return;

			// Check if there is a dropdown
			if (dropdownRef.current == null) return;

			// Check click position
			if (!dropdownRef.current.contains(e.target as Node)) {
				setShowOptions(false);
			}
		}

		// Add event handler
		document.addEventListener("click", handleClick);

		// Clean up
		return () => document.removeEventListener("click", handleClick);
	}, [showOptions, dropdownRef, setShowOptions]);
};

export default useCloseDropdown;
