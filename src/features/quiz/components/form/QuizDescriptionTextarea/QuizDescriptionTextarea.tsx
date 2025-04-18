import Textarea, { TextareaProps } from "../../../../../components/form/Textarea/Textarea";
import { ChangeEvent, Dispatch, forwardRef, SetStateAction } from "react";
import Text from "../../../../../components/ui/Text/Text";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./QuizDescriptionTextarea.css";

type QuizDescriptionTextareaProps = TextareaProps & {
	description: string;
	setDescription: Dispatch<SetStateAction<string>>;
};

const QuizDescriptionTextarea = forwardRef<HTMLTextAreaElement, QuizDescriptionTextareaProps>(
	({ description, setDescription, className, ...rest }, ref) => {
		// #region Variables
		const MAX_DESCRIPTION_LENGTH = 1000;
		//#endregion

		// #region Functions
		function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
			// Get description length
			const descriptionLength = e.target.value.length;

			// Check if description length is below limit
			if (descriptionLength > MAX_DESCRIPTION_LENGTH) return;

			// Update description
			setDescription(e.target.value);
		}
		// #endregion

		return (
			<>
				<Textarea
					label="Description"
					id="quizDescriptionTextarea"
					placeholder="Description"
					className={`quizDescriptionTextarea${addPropClassName(className)}`}
					required
					value={description}
					onChange={handleDescriptionChange}
					{...rest}
					ref={ref}
				/>
				<Text variant="neutral-400" mb="0" className="quizDescriptionTextarea__length">
					{description.length}/{MAX_DESCRIPTION_LENGTH}
				</Text>
			</>
		);
	}
);

export default QuizDescriptionTextarea;
