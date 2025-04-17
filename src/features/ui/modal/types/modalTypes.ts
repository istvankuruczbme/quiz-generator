import { Dispatch, HTMLAttributes, SetStateAction } from "react";

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
};
