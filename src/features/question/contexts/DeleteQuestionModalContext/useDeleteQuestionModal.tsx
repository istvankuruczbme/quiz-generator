import { useContext } from "react";
import DeleteQuestionModalContext from "./DeleteQuestionModalContext";

const useDeleteQuestionModal = () => useContext(DeleteQuestionModalContext);

export default useDeleteQuestionModal;
