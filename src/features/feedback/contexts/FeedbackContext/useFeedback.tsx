import { useContext } from "react";
import FeedbackContext from "./FeedbackContext";

const useFeedback = () => useContext(FeedbackContext);

export default useFeedback;
