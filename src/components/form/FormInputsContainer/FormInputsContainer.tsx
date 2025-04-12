import { CSSProperties, FC, HTMLAttributes } from "react";
import "./FormInputsContainer.css";
import addPropClassName from "../../../utils/addPropClassName";

type FormInputsContainerProps = HTMLAttributes<HTMLDivElement> & {
	gap?: string;
	mb?: string;
};

const FormInputsContainer: FC<FormInputsContainerProps> = ({
	gap = "1.5rem",
	mb = "1.5rem",
	className,
	children,
}) => {
	// #region Variables
	const style: CSSProperties & { "--gap": string; "--mb": string } = { "--gap": gap, "--mb": mb };
	//#endregion

	return (
		<div style={style} className={`formInputsContainer${addPropClassName(className)}`}>
			{children}
		</div>
	);
};

export default FormInputsContainer;
