import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./Radio.css";

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: ReactNode;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, className, ...rest }, ref) => {
	return (
		<label htmlFor={rest.id} className={`radio${addPropClassName(className)}`}>
			<input type="radio" className="radio__input" {...rest} ref={ref} />
			<span className="radio__marker"></span>
			{label != undefined && <span className="radio__label">{label}</span>}
		</label>
	);
});

export default Radio;
