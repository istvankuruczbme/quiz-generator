import { forwardRef } from "react";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonProps } from "../../../ui/Button/Button";
import addPropClassName from "../../../../utils/addPropClassName";
// Hooks
import useModal from "../../../../contexts/ModalContext/useModal";
// CSS
import "./ModalClose.css";

type ModalCloseProps = ButtonProps;

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(({ className, ...rest }, ref) => {
	// #region Hooks
	const { setShow } = useModal();
	//#endregion

	return (
		<Button
			variant="secondary"
			className={`modalClose${addPropClassName(className)}`}
			onClick={() => setShow(false)}
			{...rest}
			ref={ref}
		>
			<FontAwesomeIcon icon={faXmark} className="modalClose__icon" />
		</Button>
	);
});

export default ModalClose;
