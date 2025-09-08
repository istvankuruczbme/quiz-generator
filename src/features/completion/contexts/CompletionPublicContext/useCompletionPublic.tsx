import { useContext } from "react";
import CompletionPublicContext from "./CompletionPublicContext";

const useCompletionPublic = () => useContext(CompletionPublicContext);

export default useCompletionPublic;
