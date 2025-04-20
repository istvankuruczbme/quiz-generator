import { useContext } from "react";
import DropdownContext from "./DropdownContext";

const useDropdown = () => useContext(DropdownContext);

export default useDropdown;
