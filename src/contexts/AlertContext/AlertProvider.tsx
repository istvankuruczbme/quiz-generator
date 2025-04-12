import { FC, ReactNode, useState } from "react";
import AlertContext from "./AlertContext";
import { ColorVariant } from "../../assets/colorVariants";

type AlertProviderProps = {
	defaultShow?: boolean;
	variant?: ColorVariant;
	children: ReactNode;
};

const AlertProvider: FC<AlertProviderProps> = ({
	defaultShow = true,
	variant = "neutral",
	children,
}) => {
	// #region States
	const [show, setShow] = useState(defaultShow);
	// #endregion

	// #region Funcitons
	function closeAlert(): void {
		setShow(false);
	}
	// #endregion

	return (
		<AlertContext.Provider value={{ variant, show, closeAlert }}>
			{children}
		</AlertContext.Provider>
	);
};

export default AlertProvider;
