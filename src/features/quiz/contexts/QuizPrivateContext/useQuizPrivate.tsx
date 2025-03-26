import { useContext } from "react";
import QuizPrivateContext from "./QuizPrivateContext";

const useQuizPrivate = () => useContext(QuizPrivateContext);

export default useQuizPrivate;
