import { useContext } from "react";
import EditQuestionContext from "./EditQuestionContext";

const useEditQuestion = () => useContext(EditQuestionContext);

export default useEditQuestion;
