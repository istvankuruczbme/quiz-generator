import { CSSProperties, forwardRef, ReactNode, TextareaHTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./Textarea.css";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: ReactNode;
	full?: boolean;
	minHeight?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, full, minHeight = "6rem", className, ...rest }, ref) => {
		// #region Variables
		const style: CSSProperties & { "--min-height": string } = { "--min-height": minHeight };
		//#endregion

		return (
			<div className={`textarea${full ? " textarea--full" : ""}${addPropClassName(className)}`}>
				{label != undefined && (
					<label htmlFor={rest.id} className="textarea__label">
						{label}
					</label>
				)}
				<textarea className="textarea__textarea" style={style} {...rest} ref={ref}></textarea>
			</div>
		);
	}
);

export default Textarea;
