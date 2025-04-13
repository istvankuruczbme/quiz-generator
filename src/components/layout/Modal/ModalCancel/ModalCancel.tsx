import { forwardRef } from "react";
import useModal from "../../../../contexts/ModalContext/useModal";
import Button, { ButtonProps } from "../../../ui/Button/Button";
import "./ModalCancel.css";
import addPropClassName from "../../../../utils/addPropClassName";

type ModalCancelProps = ButtonProps;

const ModalCancel = forwardRef<HTMLButtonElement, ModalCancelProps>(
	({ className, ...rest }, ref) => {
		// #region Hooks
		const { setShow } = useModal();
		// #endregion

		return (
			<Button
				variant="neutral"
				className={`modalCancel${addPropClassName(className)}`}
				onClick={() => setShow(false)}
				{...rest}
				ref={ref}
			>
				Cancel
			</Button>
		);
	}
);

export default ModalCancel;
