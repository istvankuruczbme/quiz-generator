import Page from "../../../../components/layout/Page/Page";
import BrowseQuizzes from "../../components/layout/BrowseQuizzes/BrowseQuizzes";
import BrowseSearch from "../../components/layout/BrowseSearch/BrowseSearch";
import QuizSearchProvider from "../../contexts/QuizSearchContext/QuizSearchProvider";
import "./Browse.css";

const Browse = () => {
	return (
		<QuizSearchProvider>
			<Page>
				<BrowseSearch />
				<BrowseQuizzes />
			</Page>
		</QuizSearchProvider>
	);
};

export default Browse;
