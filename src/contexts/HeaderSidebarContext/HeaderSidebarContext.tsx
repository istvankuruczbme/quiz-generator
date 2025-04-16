import { createContext, Dispatch, SetStateAction } from "react";

type HeaderSidebarContextProps = {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
};

const HeaderSidebarContext = createContext<HeaderSidebarContextProps>({
	show: false,
	setShow: () => {},
});

export default HeaderSidebarContext;
