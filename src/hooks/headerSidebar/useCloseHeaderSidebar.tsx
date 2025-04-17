import { useCallback, useLayoutEffect } from "react";
import useHeaderSidebar from "../../contexts/HeaderSidebarContext/useHeaderSidebar";

const useCloseHeaderSidebar = () => {
	// #region Hooks
	const { show, setShow } = useHeaderSidebar();
	//#endregion

	// #region Functions
	const handleClick = useCallback(
		(e: MouseEvent): void => {
			if (!show) return;

			// Get target from event
			const target = e.target as Element;

			// Target is nav button
			if (target.closest(".headerMenuButton") != null) return;

			// Target is outside sidebar
			if (target.closest(".headerSidebar") == null) setShow(false);
		},
		[show, setShow]
	);
	// #endregion

	useLayoutEffect(() => {
		// Add click event listener
		document.addEventListener("click", handleClick);

		// Remove event listener
		return () => document.removeEventListener("click", handleClick);
	}, [handleClick]);
};

export default useCloseHeaderSidebar;
