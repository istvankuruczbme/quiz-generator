import { forwardRef } from "react";
import Button, { ButtonProps } from "../../../../../../components/ui/Button/Button";
import useModal from "../../../contexts/ModalContext/useModal";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./ModalCancel.css";

type ModalCancelProps = ButtonProps;

const ModalCancel = forwardRef<HTMLButtonElement, ModalCancelProps>(
	({ className, children = "Cancel", ...rest }, ref) => {
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
				{children}
			</Button>
		);
	}
);

export default ModalCancel;
