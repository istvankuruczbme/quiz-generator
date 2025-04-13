import { useContext } from "react";
import ProductsContext from "./ProductsContext";

const useProducts = () => useContext(ProductsContext);

export default useProducts;
