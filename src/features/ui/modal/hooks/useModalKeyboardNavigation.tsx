import { RefObject, useCallback, useLayoutEffect } from "react";
import useModal from "../contexts/ModalContext/useModal";
import focusableElementQueryString from "../../../../assets/focusableElementQueryString";

const useModalKeyboardNavigation = (modalRef: RefObject<HTMLDivElement | null>) => {
	// #region Hooks
	const { show, setShow } = useModal();
	//#endregion

	// #region Functions
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			// Escapse
			if (e.key === "Escape") {
				// Close modal
				setShow(false);
				return;
			}

			// Tab
			if (e.key === "Tab" && modalRef.current != null) {
				// Select first and last focusable element
				const focusableElements = Array.from(
					modalRef.current.querySelectorAll(focusableElementQueryString)
				) as HTMLElement[];
				const firstFocusableElement = focusableElements[0];
				const lastFocusableElement = focusableElements.at(-1);

				// Check first and last element
				if (firstFocusableElement == undefined || lastFocusableElement == undefined) return;

				// Prevent tab out
				if (e.shiftKey && document.activeElement === firstFocusableElement) {
					e.preventDefault();
					lastFocusableElement.focus();
				}
				if (document.activeElement === lastFocusableElement) {
					e.preventDefault();
					firstFocusableElement.focus();
				}
			}
		},
		[modalRef, setShow]
	);
	// #endregion

	useLayoutEffect(() => {
		if (!show) return;

		// Event listener
		document.addEventListener("keydown", handleKeyDown);

		// Clean up
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [show, setShow, handleKeyDown]);
};

export default useModalKeyboardNavigation;
