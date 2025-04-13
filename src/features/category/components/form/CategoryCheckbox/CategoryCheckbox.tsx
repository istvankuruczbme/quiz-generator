import { forwardRef, InputHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./CategoryCheckbox.css";

type CategoryCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
	icon: IconDefinition;
	name: string;
};

const CategoryCheckbox = forwardRef<HTMLInputElement, CategoryCheckboxProps>(
	({ icon, name, className, ...rest }, ref) => {
		return (
			<label htmlFor={rest.id} className={`categoryCheckbox${addPropClassName(className)}`}>
				<input type="checkbox" className="categoryCheckbox__input" {...rest} ref={ref} />

				<FontAwesomeIcon icon={icon} className="categoryCheckbox__icon" />
				<span className="categoryCheckbox__name">{name}</span>
			</label>
		);
	}
);

export default CategoryCheckbox;
