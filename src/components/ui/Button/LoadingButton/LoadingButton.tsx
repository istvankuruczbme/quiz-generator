import { forwardRef } from "react";
import Button, { ButtonProps } from "../Button";
import Spinner from "../../Spinner/Spinner";
import addPropClassName from "../../../../utils/addPropClassName";
import "./LoadingButton.css";

export type LoadingButtonProps = ButtonProps & {
	loading: boolean;
};

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
	({ loading, className, children, ...rest }, ref) => {
		return (
			<Button
				disabled={loading}
				className={`loadingButton${addPropClassName(className)}`}
				{...rest}
				ref={ref}
			>
				{loading && <Spinner />}
				{children}
			</Button>
		);
	}
);

export default LoadingButton;
