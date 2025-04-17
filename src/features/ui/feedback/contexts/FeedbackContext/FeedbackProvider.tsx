import { FC, ReactNode, useState } from "react";
import FeedbackContext from "./FeedbackContext";
import Feedback from "../../components/ui/Feedback/Feedback";
import { Feedback as FeedbackType } from "../../types/feedbackTypes";

type FeedbackProviderProps = {
	children: ReactNode;
};

const FeedbackProvider: FC<FeedbackProviderProps> = ({ children }) => {
	// #region States
	const [feedback, setFeedback] = useState<FeedbackType>({
		type: "success",
		message: "",
		details: "",
	});

	//#endregion

	return (
		<FeedbackContext.Provider value={{ setFeedback }}>
			<Feedback feedback={feedback} />
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackProvider;
