import { FC, HTMLAttributes } from "react";
import useModal from "../../../features/modal/contexts/ModalContext/useModal";
import addPropClassName from "../../../utils/addPropClassName";
import "./Overlay.css";

type OverlayProps = HTMLAttributes<HTMLDivElement>;

const Overlay: FC<OverlayProps> = ({ className, children }) => {
	// #region Hooks
	const { show } = useModal();
	//#endregion

	return (
		<div className={`overlay${show ? " overlay--show" : ""}${addPropClassName(className)}`}>
			{children}
		</div>
	);
};

export default Overlay;
