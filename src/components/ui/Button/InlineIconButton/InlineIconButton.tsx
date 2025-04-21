import { ButtonHTMLAttributes, forwardRef } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import addPropClassName from "../../../../utils/addPropClassName";
import "./InlineIconButton.css";

type InlineIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon: IconDefinition;
};

const InlineIconButton = forwardRef<HTMLButtonElement, InlineIconButtonProps>(
	({ icon, className, ...rest }, ref) => {
		return (
			<button
				type="button"
				className={`inlineIconButton${addPropClassName(className)}`}
				{...rest}
				ref={ref}
			>
				<FontAwesomeIcon icon={icon} className="inlineIconButton__icon" />
			</button>
		);
	}
);

export default InlineIconButton;
