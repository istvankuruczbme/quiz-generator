import {
	forwardRef,
	HTMLInputTypeAttribute,
	InputHTMLAttributes,
	ReactNode,
	useState,
} from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./Input.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	type?: HTMLInputTypeAttribute;
	label?: string | ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ type = "text", label, className, ...rest }, ref) => {
		// #region States
		const [showPassword, setShowPassword] = useState(false);
		//#endregion

		// #region Functions
		function handleShowPasswordClick() {
			setShowPassword((show) => !show);
		}
		// #endregion

		return (
			<div className={`input${addPropClassName(className)}`}>
				{label != undefined && (
					<label htmlFor={rest.id} className="input__label">
						{label}
					</label>
				)}
				<input
					type={showPassword ? "text" : type}
					placeholder={rest.placeholder || " "}
					className={`input__input${type === "password" ? " input__input--password" : ""}`}
					{...rest}
					ref={ref}
				/>
				{type === "password" && (
					<button
						type="button"
						className={`input__password${showPassword ? " input__password--show" : ""}`}
						onClick={handleShowPasswordClick}
					>
						<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
					</button>
				)}
			</div>
		);
	}
);

export default Input;
