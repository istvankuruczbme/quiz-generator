import { createContext } from "react";
import { CompletionPrivate } from "../../types/completionTypes";

type CompletionPrivateContextType = {
	completion: CompletionPrivate | null;
	loading: boolean;
};
const CompletionPrivateContext = createContext<CompletionPrivateContextType>({
	completion: null,
	loading: true,
});

export default CompletionPrivateContext;
