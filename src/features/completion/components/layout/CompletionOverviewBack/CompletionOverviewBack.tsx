import Section from "../../../../../components/layout/Section/Section";
import BackButton from "../../../../../components/ui/Button/BackButton/BackButton";
import "./CompletionOverviewBack.css";

const CompletionOverviewBack = () => {
	return (
		<Section>
			<BackButton variant="primary" to="/my-quizzes">
				My completions
			</BackButton>
		</Section>
	);
};

export default CompletionOverviewBack;
