import { PropsWithChildren } from "react";
import CompletionPrivateContext from "./CompletionPrivateContext";
import useGetCompletionPrivate from "../../hooks/useGetCompletionPrivate";

const CompletionPrivateProvider = ({ children }: PropsWithChildren) => {
	// #region Hooks
	const { completion, loading } = useGetCompletionPrivate();
	// #endregion

	return (
		<CompletionPrivateContext.Provider value={{ completion, loading }}>
			{children}
		</CompletionPrivateContext.Provider>
	);
};

export default CompletionPrivateProvider;
