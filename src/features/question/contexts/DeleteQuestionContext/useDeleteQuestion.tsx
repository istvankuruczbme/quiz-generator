import { useContext } from "react";
import DeleteQuestionContext from "./DeleteQuestionContext";

const useDeleteQuestion = () => useContext(DeleteQuestionContext);

export default useDeleteQuestion;
