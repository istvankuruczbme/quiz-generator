import Button, { ButtonProps } from "../Button";
import "./LoadingButton.css";
import addPropClassName from "../../../../utils/addPropClassName";
import { forwardRef } from "react";
import Spinner from "../../Spinner/Spinner";

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
