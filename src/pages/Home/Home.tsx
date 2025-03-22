import { Link } from "react-router-dom";
// Components
import NotSignedIn from "../../features/auth/components/layout/NotSignedIn/NotSignedIn";
import SignedIn from "../../features/auth/components/layout/SignedIn/SignedIn";
// Hooks
import useUser from "../../contexts/UserContext/useUser";
// Functions
import signOut from "../../features/auth/services/signOut";
// CSS
import "./Home.css";

const Home = () => {
	//#region Hooks
	const { user } = useUser();
	//#endregion

	return (
		<div>
			<h1>Quiz generator</h1>

			<NotSignedIn>
				<p>You are not signed in. Click on the button below to sign in or sign up.</p>

				<div>
					<Link to="/sign-in">
						<button tabIndex={-1}>Sign In</button>
					</Link>
					<Link to="/sign-up">
						<button tabIndex={-1}>Sign Up</button>
					</Link>
				</div>
			</NotSignedIn>

			<SignedIn>
				<h2>Hello {user?.name}!</h2>
				<p>{JSON.stringify(user)}</p>

				<nav>
					Menu:
					<ul>
						<li>
							<Link to="/my-quizzes">My quizzes</Link>
						</li>
						<li>
							<Link to="/profile">Profile</Link>
						</li>
					</ul>
				</nav>

				<button onClick={signOut}>Sign Out</button>
			</SignedIn>
		</div>
	);
};

export default Home;
