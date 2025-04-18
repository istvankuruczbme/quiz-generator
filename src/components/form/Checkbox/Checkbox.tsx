import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./Checkbox.css";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
	label: ReactNode;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, className, ...rest }, ref) => {
		return (
			<label htmlFor={rest.id} className={`checkbox${addPropClassName(className)}`}>
				<input type="checkbox" id={rest.id} className="checkbox__input" {...rest} ref={ref} />
				<span className="checkbox__marker"></span>
				<span className="checkbox__label">{label}</span>
			</label>
		);
	}
);

export default Checkbox;
