import { forwardRef, ReactNode, TextareaHTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./Textarea.css";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: ReactNode;
	full?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, full, className, ...rest }, ref) => {
		return (
			<div className={`textarea${full ? " textarea--full" : ""}${addPropClassName(className)}`}>
				{label != undefined && (
					<label htmlFor={rest.id} className="textarea__label">
						{label}
					</label>
				)}
				<textarea className="textarea__textarea" {...rest} ref={ref}></textarea>
			</div>
		);
	}
);

export default Textarea;
