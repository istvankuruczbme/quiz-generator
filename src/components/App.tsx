import { Route, Routes } from "react-router-dom";
// Components
import SubscriptionRequiredRoute from "../features/user/components/layout/SubscriptionRequiredRoute/SubscriptionRequiredRoute";
import MyQuizzes from "../features/quiz/pages/MyQuizzes/MyQuizzes";
import NewQuiz from "../features/quiz/pages/NewQuiz/NewQuiz";
import Quiz from "../features/quiz/pages/Quiz/Quiz";
import EditQuiz from "../features/quiz/pages/EditQuiz/EditQuiz";
import SignedInRoute from "../features/auth/components/layout/SignedInRoute/SignedInRoute";
import ChangeSubscription from "../features/subscription/pages/ChangeSubscription/ChangeSubscription";
import ChangeCategories from "../features/category/pages/ChangeCategories/ChangeCategories";
import NotSignedInRoute from "../features/auth/components/layout/NotSignedInRoute/NotSignedInRoute";
import SignIn from "../features/auth/pages/SignIn/SignIn";
import SignUp from "../features/auth/pages/SignUp/SignUp";
import PasswordResetEmail from "../features/auth/pages/PasswordResetEmail/PasswordResetEmail";
import PasswordReset from "../features/auth/pages/PasswordReset/PasswordReset";
import Home from "../pages/Home/Home";
import Profile from "../features/user/pages/Profile/Profile";
import ChangeEmail from "../features/auth/pages/ChangeEmail/ChangeEmail";
import ChangePassword from "../features/auth/pages/ChangePassword/ChangePassword";
import SubscriptionRequired from "../features/ui/error/pages/SubscriptionRequired/SubscriptionRequired";
import Unauthorized from "../features/ui/error/pages/Unauthorized/Unauthorized";
import QuizNotFound from "../features/ui/error/pages/QuizNotFound/QuizNotFound";
// CSS
import "./App.css";

function App() {
	return (
		<>
			<Routes>
				<Route element={<SignedInRoute />}>
					<Route element={<SubscriptionRequiredRoute />}>
						{/* Quiz */}
						<Route path="/quizzes/:quizId" element={<Quiz />} />
						<Route path="/quizzes/:quizId/edit" element={<EditQuiz />} />
						<Route path="/new-quiz" element={<NewQuiz />} />
						<Route path="/my-quizzes" element={<MyQuizzes />} />
					</Route>

					{/* Profile */}
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/change-email" element={<ChangeEmail />} />
					<Route path="/profile/change-password" element={<ChangePassword />} />
					<Route path="/profile/subscription" element={<ChangeSubscription />} />
					<Route path="/profile/categories" element={<ChangeCategories />} />
				</Route>

				{/* Auth */}
				<Route element={<NotSignedInRoute />}>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/reset-password-email" element={<PasswordResetEmail />} />
					<Route path="/reset-password" element={<PasswordReset />} />
				</Route>

				<Route path="/" element={<Home />} />

				{/* Error */}
				<Route path="/error">
					<Route path="quiz-not-found" element={<QuizNotFound />} />
					<Route path="subscription-required" element={<SubscriptionRequired />} />
					<Route path="unauthorized" element={<Unauthorized />} />
				</Route>
				<Route path="*" element={<h1>Page not found</h1>} />
			</Routes>
		</>
	);
}

export default App;
