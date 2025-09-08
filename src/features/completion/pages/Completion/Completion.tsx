import Page from "../../../../components/layout/Page/Page";
import CompletionAnswerOptions from "../../components/layout/CompletionAnswerOptions/CompletionAnswerOptions";
import CompletionButtons from "../../components/layout/CompletionButtons/CompletionButtons";
import CompletionHeader from "../../components/layout/CompletionHeader/CompletionHeader";
import CompletionQuestion from "../../components/layout/CompletionQuestion/CompletionQuestion";
import CompletionPublicProvider from "../../contexts/CompletionPublicContext/CompletionPublicProvider";

const Completion = () => {
	return (
		<CompletionPublicProvider>
			<Page>
				<CompletionHeader />
				<CompletionQuestion />
				<CompletionAnswerOptions />
				<CompletionButtons />
			</Page>
		</CompletionPublicProvider>
	);
};

export default Completion;
