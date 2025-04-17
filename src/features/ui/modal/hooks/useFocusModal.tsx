import { RefObject, useLayoutEffect } from "react";
import useModal from "../contexts/ModalContext/useModal";
import focusableElementQueryString from "../../../../assets/focusableElementQueryString";

const useFocusModal = (
	modalRef: RefObject<HTMLDivElement | null>,
	lastFocusedElementRef: RefObject<HTMLElement | null>
) => {
	// #region Hooks
	const { show } = useModal();
	// #endregion

	useLayoutEffect(() => {
		if (show) {
			// Set last focused element to current active element
			lastFocusedElementRef.current = document.activeElement as HTMLElement;

			// Check modal ref
			if (modalRef.current == null) return;

			// Select focusable elemnts inside modal
			const firstFocusableElement = modalRef.current.querySelector<HTMLElement>(
				focusableElementQueryString
			);

			// Focus element
			firstFocusableElement?.focus();
		} else {
			// Check last focused element
			if (lastFocusedElementRef.current == null) return;

			// Focus last focused element
			lastFocusedElementRef.current.focus();

			// Reset last focused element to null
			lastFocusedElementRef.current = null;
		}
	}, [show, modalRef, lastFocusedElementRef]);
};

export default useFocusModal;
