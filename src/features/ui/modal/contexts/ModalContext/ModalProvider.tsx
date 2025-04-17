import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import ModalContext from "./ModalContext";

type ModalProviderProps = {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
};

const ModalProvider: FC<ModalProviderProps> = ({ show, setShow, children }) => {
	return <ModalContext.Provider value={{ show, setShow }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
