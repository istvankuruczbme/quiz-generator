import { FC, ReactNode } from "react";
import QuizPrivateContext from "./QuizPrivateContext";
import useQuiz from "../../hooks/useQuiz";

type QuizPrivateProviderProps = {
	children: ReactNode;
};

const QuizPrivateProvider: FC<QuizPrivateProviderProps> = ({ children }) => {
	// #region Hook
	const { quiz, setQuiz, loading, setLoading } = useQuiz();
	//#endregion

	return (
		<QuizPrivateContext.Provider value={{ quiz, setQuiz, loading, setLoading }}>
			{children}
		</QuizPrivateContext.Provider>
	);
};

export default QuizPrivateProvider;
