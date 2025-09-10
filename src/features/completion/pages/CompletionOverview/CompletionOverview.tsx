import Page from "../../../../components/layout/Page/Page";
import CompletionOverviewBack from "../../components/layout/CompletionOverviewBack/CompletionOverviewBack";
import CompletionOverviewButtons from "../../components/layout/CompletionOverviewButtons/CompletionOverviewButtons";
import CompletionOverviewMetadata from "../../components/layout/CompletionOverviewMetadata/CompletionOverviewMetadata";
import CompletionOverviewQuestions from "../../components/layout/CompletionOverviewQuestions/CompletionOverviewQuestions";
import CompletionOverviewQuiz from "../../components/layout/CompletionOverviewQuiz/CompletionOverviewQuiz";
import CompletionPrivateProvider from "../../contexts/CompletionPrivateContext/CompletionPrivateProvider";

const CompletionOverview = () => {
	return (
		<CompletionPrivateProvider>
			<Page>
				<CompletionOverviewBack />
				<CompletionOverviewQuiz />
				<CompletionOverviewMetadata />
				<CompletionOverviewQuestions />
				<CompletionOverviewButtons />
			</Page>
		</CompletionPrivateProvider>
	);
};

export default CompletionOverview;
