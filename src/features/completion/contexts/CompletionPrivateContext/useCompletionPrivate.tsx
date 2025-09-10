import { useContext } from "react";
import CompletionPrivateContext from "./CompletionPrivateContext";

const useCompletionPrivate = () => useContext(CompletionPrivateContext);

export default useCompletionPrivate;
