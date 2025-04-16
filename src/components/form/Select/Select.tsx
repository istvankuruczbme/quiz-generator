import { forwardRef, ReactNode, SelectHTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./Select.css";

type SelectOption = {
	id: string;
	text: string;
};
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label?: string | ReactNode;
	full?: boolean;
	options: SelectOption[];
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ label, full, options, className, ...rest }, ref) => {
		return (
			<div className={`select${full ? " select--full" : ""}${addPropClassName(className)}`}>
				{label != undefined && (
					<label htmlFor={rest.id} className="select__label">
						{label}
					</label>
				)}
				<select className="select__select" {...rest} ref={ref}>
					{options.map((option) => (
						<option key={option.id} value={option.id} className="select__select__option">
							{option.text}
						</option>
					))}
				</select>
			</div>
		);
	}
);

export default Select;
