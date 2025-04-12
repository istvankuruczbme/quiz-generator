import { ButtonHTMLAttributes, forwardRef } from "react";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
// Hooks
import useAlert from "../../../../contexts/AlertContext/useAlert";
// Functions
import addPropClassName from "../../../../utils/addPropClassName";
// CSS
import "./AlertCloseButton.css";

type AlertCloseButton = ButtonHTMLAttributes<HTMLButtonElement>;

const AlertCloseButton = forwardRef<HTMLButtonElement, AlertCloseButton>(
	({ className, ...rest }, ref) => {
		// #region Hooks
		const { variant, closeAlert } = useAlert();
		//#endregion

		return (
			<Button
				variant={variant}
				className={`alertCloseButton${addPropClassName(className)}`}
				onClick={closeAlert}
				{...rest}
				ref={ref}
			>
				<FontAwesomeIcon icon={faXmark} className="alertCloseButton__icon" />
			</Button>
		);
	}
);

export default AlertCloseButton;
