import { useNavigate } from "react-router-dom";
import Section from "../../../../../components/layout/Section/Section";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import useError from "../../../../error/hooks/useError";
import useCompletionPrivate from "../../../contexts/CompletionPrivateContext/useCompletionPrivate";
import useCreateCompletion from "../../../hooks/useCreateCompletion";
import "./CompletionOverviewButtons.css";
import CompletionOverviewButtonsSkeleton from "./CompletionOverviewButtonsSkeleton/CompletionOverviewButtonsSkeleton";

const CompletionOverviewButtons = () => {
	// #region Hooks
	const { completion, loading: loadingData } = useCompletionPrivate();
	const { mutateAsync, loading } = useCreateCompletion();
	const { setError } = useError();
	const navigate = useNavigate();
	// #endregion

	// #region Functions
	async function handleRestartQuizClick() {
		// Check completion
		if (!completion) return;

		try {
			// Create new completion
			const newCompletion = await mutateAsync({ quizId: completion.quiz.id });

			// Navigate
			navigate(`/quizzes/${completion.quiz.id}/completions/${newCompletion.id}`);
		} catch (err) {
			setError(err);
		}
	}
	// #endregion

	return (
		<Suspense loading={loadingData} fallback={<CompletionOverviewButtonsSkeleton />}>
			<Section>
				<LoadingButton full loading={loading} onClick={handleRestartQuizClick}>
					Restart quiz
				</LoadingButton>
			</Section>
		</Suspense>
	);
};

export default CompletionOverviewButtons;
