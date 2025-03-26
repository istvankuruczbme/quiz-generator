import { FC, FormEvent, HTMLAttributes } from "react";
import useAnswerOptions from "../../../../answerOption/hooks/useAnswerOptions";
import NewAnswerOption from "../../../../answerOption/components/ui/NewAnswerOption/NewAnswerOption";
import "./NewQuestionForm.css";

type NewQuestionFormProps = HTMLAttributes<HTMLDivElement>;

const NewQuestionForm: FC<NewQuestionFormProps> = () => {
	//#region Hooks
	const { answerOptions, addAnswerOption, updateAnswerOption, removeAnswerOption } =
		useAnswerOptions();
	//#endregion

	//#region Functions
	async function handleNewQuestionSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}
	//#endregion

	return (
		<div>
			<h3>New question</h3>

			<form onSubmit={handleNewQuestionSubmit}>
				<label htmlFor="editQuizNewQuestionText">Text</label>
				<input type="text" id="editQuizNewQuestionText" placeholder="Text" required />
				<br />

				<p>Answer options:</p>
				{answerOptions.length === 0 && <p>No options.</p>}
				{answerOptions.map((option) => (
					<NewAnswerOption
						key={option.id}
						option={option}
						updateAnswerOption={updateAnswerOption}
						removeAnswerOption={removeAnswerOption}
					/>
				))}

				<button type="button" onClick={addAnswerOption}>
					New option
				</button>
				<br />

				<br />
				<button type="submit">Add question</button>
			</form>
		</div>
	);
};

export default NewQuestionForm;
