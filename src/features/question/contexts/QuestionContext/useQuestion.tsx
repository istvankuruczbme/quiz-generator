import { useContext } from "react";
import QuestionContext from "./QuestionContext";

const useQuestion = () => useContext(QuestionContext);

export default useQuestion;
