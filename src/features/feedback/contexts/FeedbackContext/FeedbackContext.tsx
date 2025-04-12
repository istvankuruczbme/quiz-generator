import { createContext, Dispatch, SetStateAction } from "react";
import { Feedback } from "../../types/feedbackTypes";

type FeedbackContextType = {
	setFeedback: Dispatch<SetStateAction<Feedback>>;
};

const FeedbackContext = createContext<FeedbackContextType>({
	setFeedback: () => {},
});

export default FeedbackContext;
