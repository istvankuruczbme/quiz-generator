import { FC, ReactNode, useState } from "react";
import EditQuizContext from "./EditQuizContext";

type EditQuizProviderProps = {
	children: ReactNode;
};

const EditQuizProvider: FC<EditQuizProviderProps> = ({ children }) => {
	// #region States
	const [loadingGeneration, setLoadingGeneration] = useState(false);
	// #endregion

	return (
		<EditQuizContext.Provider value={{ loadingGeneration, setLoadingGeneration }}>
			{children}
		</EditQuizContext.Provider>
	);
};

export default EditQuizProvider;
