import { useContext } from "react";
import EditQuizContext from "./EditQuizContext";

const useEditQuiz = () => useContext(EditQuizContext);

export default useEditQuiz;
