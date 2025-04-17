import { useLayoutEffect } from "react";
import useModal from "../contexts/ModalContext/useModal";

const useDisableBodyScroll = () => {
	// #regin Hooks
	const { show } = useModal();
	// #endregion

	useLayoutEffect(() => {
		document.body.classList.toggle("body--modal", show);
	}, [show]);
};

export default useDisableBodyScroll;
