import { createContext, Dispatch, SetStateAction } from "react";

type ModalContextType = {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType>({
	show: false,
	setShow: () => {},
});

export default ModalContext;
