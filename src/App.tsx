import { Link } from "react-router-dom";
import "./App.css";
import useUser from "./contexts/UserContext/useUser";
import { supabase } from "./lib/supabase";

function App() {
	// #region Hooks
	const { user } = useUser();
	// #endregion

	// #region Functions
	async function signOutUser() {
		try {
			await supabase.auth.signOut();
		} catch (err) {
			console.log("Error signing out the user.\n", err);
		}
	}
	// #endregion

	return (
		<>
			<h1>Quiz generator</h1>

			{user == null && (
				<>
					<p>You are not signed in.</p>
					<Link to="/sign-in">
						<button tabIndex={-1}>Sign In</button>
					</Link>
				</>
			)}
			{user != null && (
				<>
					<p>Hello {user.id}</p>
					<button onClick={signOutUser}>Sign Out</button>
				</>
			)}
		</>
	);
}

export default App;
