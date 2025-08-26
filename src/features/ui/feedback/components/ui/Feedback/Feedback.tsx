import { FC, HTMLAttributes } from "react";
import { Feedback as FeedbackType } from "../../../types/feedbackTypes";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../../../components/ui/Button/Button";
// Hooks
import useShowFeedback from "../../../hooks/useShowFeedback";
// CSS
import "./Feedback.css";

type FeedbackProps = HTMLAttributes<HTMLDivElement> & {
	feedback: FeedbackType;
};

const Feedback: FC<FeedbackProps> = ({ feedback }) => {
	// #region Hooks
	const { isOpen, closeFeedback } = useShowFeedback(feedback);
	//#endregion

	return (
		<div className={`feedback feedback--${feedback.type}${isOpen ? " feedback--open" : ""}`}>
			<header className="feedback__header">
				<p className="feedback__message">{feedback.message}</p>

				<Button variant="secondary" className="feedback__close" onClick={closeFeedback}>
					<FontAwesomeIcon icon={faXmark} />
				</Button>
			</header>

			{feedback.details != undefined && feedback.details !== "" && (
				<pre className="feedback__details">{feedback.details}</pre>
			)}
		</div>
	);
};

export default Feedback;
