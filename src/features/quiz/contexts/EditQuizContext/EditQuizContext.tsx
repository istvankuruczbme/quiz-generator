import { createContext, Dispatch, SetStateAction } from "react";

type EditQuizContextType = {
	loadingGeneration: boolean;
	setLoadingGeneration: Dispatch<SetStateAction<boolean>>;
};

const EditQuizContext = createContext<EditQuizContextType>({
	loadingGeneration: false,
	setLoadingGeneration: () => {},
});

export default EditQuizContext;
