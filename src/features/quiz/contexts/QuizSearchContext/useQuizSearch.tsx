import { useContext } from "react";
import QuizSearchContext from "./QuizSearchContext";

const useQuizSearch = () => useContext(QuizSearchContext);

export default useQuizSearch;
