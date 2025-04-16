import { useContext } from "react";
import HeaderSidebarContext from "./HeaderSidebarContext";

const useHeaderSidebar = () => useContext(HeaderSidebarContext);

export default useHeaderSidebar;
