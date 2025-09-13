import { forwardRef, MouseEvent } from "react";
import Button, { ButtonProps } from "../../../../../../components/ui/Button/Button";
import useModal from "../../../contexts/ModalContext/useModal";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./ModalCancel.css";

type ModalCancelProps = ButtonProps;

const ModalCancel = forwardRef<HTMLButtonElement, ModalCancelProps>(
	({ className, onClick, children = "Cancel", ...rest }, ref) => {
		// #region Hooks
		const { setShow } = useModal();
		// #endregion

		// #region Functions
		function handleClick(e: MouseEvent<HTMLButtonElement>) {
			// Close modal
			setShow(false);

			// Run custom handler
			onClick?.(e);
		}
		//#endregion

		return (
			<Button
				variant="neutral"
				className={`modalCancel${addPropClassName(className)}`}
				onClick={handleClick}
				{...rest}
				ref={ref}
			>
				{children}
			</Button>
		);
	}
);

export default ModalCancel;
