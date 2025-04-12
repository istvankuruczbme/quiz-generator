import { createContext } from "react";
import { ColorVariant } from "../../assets/colorVariants";

type AlertContextType = {
	variant: ColorVariant;
	show: boolean;
	closeAlert: () => void;
};

const AlertContext = createContext<AlertContextType>({
	variant: "neutral",
	show: false,
	closeAlert: () => {},
});

export default AlertContext;
