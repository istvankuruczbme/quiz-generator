import Section from "../../../../../components/layout/Section/Section";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import CompletionAnswerOptionsSkeleton from "./CompletionAnswerOptionsSkeleton/CompletionAnswerOptionsSkeleton";
import AnswerOptionCheckbox from "../../../../answerOption/components/form/AnswerOptionCheckbox/AnswerOptionCheckbox";
import useCompletionPublic from "../../../contexts/CompletionPublicContext/useCompletionPublic";
import "./CompletionAnswerOptions.css";

const CompletionAnswerOptions = () => {
	//#region Hooks
	const {
		loading,
		question,
		completionQuestion,
		selectedAnswerOptions,
		handleAnswerOptionChange,
	} = useCompletionPublic();
	//#endregion

	return (
		<Section>
			<div className="completionAnswerOptions">
				<Suspense loading={loading} fallback={<CompletionAnswerOptionsSkeleton />}>
					{question?.answerOptions.map((option) => {
						// #region Constants
						const selectedAnswerOption = selectedAnswerOptions.includes(option.id);
						const completionQuestionAnswerOption = completionQuestion?.answerOptions.find(
							(o) => o.id === option.id
						);

						const correct = selectedAnswerOption && completionQuestionAnswerOption?.isCorrect;
						const wrong = selectedAnswerOption && !completionQuestionAnswerOption?.isCorrect;
						const empty = !selectedAnswerOption && completionQuestionAnswerOption?.isCorrect;
						// #endregion

						return (
							<AnswerOptionCheckbox
								key={option.id}
								label={option.text}
								id={option.id}
								disabled={completionQuestion != null}
								correct={completionQuestion ? correct : undefined}
								wrong={completionQuestion ? wrong : undefined}
								empty={completionQuestion ? empty : undefined}
								checked={selectedAnswerOptions.includes(option.id)}
								onChange={() => handleAnswerOptionChange(option.id)}
							/>
						);
					})}
				</Suspense>
			</div>
		</Section>
	);
};

export default CompletionAnswerOptions;
