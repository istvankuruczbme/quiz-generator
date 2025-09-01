import Textarea, { TextareaProps } from "../../../../../components/form/Textarea/Textarea";
import { ChangeEvent, forwardRef } from "react";
import Text from "../../../../../components/ui/Text/Text";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./QuizDescriptionTextarea.css";

type QuizDescriptionTextareaProps = Omit<TextareaProps, "value"> & {
	value?: string;
};

const QuizDescriptionTextarea = forwardRef<HTMLTextAreaElement, QuizDescriptionTextareaProps>(
	({ onChange, className, ...rest }, ref) => {
		// #region Variables
		const MAX_DESCRIPTION_LENGTH = 1000;
		//#endregion

		// #region Functions
		function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
			// Get description length
			const descriptionLength = e.target.value.length;

			// Check if description length is below limit
			if (descriptionLength > MAX_DESCRIPTION_LENGTH) return;

			// Run custom handler
			onChange?.(e);
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
					onChange={handleDescriptionChange}
					{...rest}
					ref={ref}
				/>
				<Text variant="neutral-400" mb="0" className="quizDescriptionTextarea__length">
					{rest.value?.length ?? 0}/{MAX_DESCRIPTION_LENGTH}
				</Text>
			</>
		);
	}
);

export default QuizDescriptionTextarea;
