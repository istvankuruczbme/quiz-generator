import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./Overlay.css";
import useModal from "../../../features/ui/modal/contexts/ModalContext/useModal";

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
