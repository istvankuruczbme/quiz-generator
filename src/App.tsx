import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { supabase } from "./lib/supabase";
import { axios } from "./lib/axios";

function App() {
	// #region States
	const [accessToken, setAccessToken] = useState("");
	//#endregion

	// #region Hooks
	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === "SIGNED_IN" && session != null) {
				setAccessToken(session.access_token);

				try {
					const { data } = await axios.get(
						`/test/users/${session.user.id}`
						// 	,
						// 	{
						// 	headers: {
						// 		Authorization: `Bearer ${session.access_token}`,
						// 	},
						// }
					);
					console.log("User data from DB: ", data);
				} catch (err) {
					console.log("Error fetching user data from DB.", err);
				}
			}
			if (event === "SIGNED_OUT") {
				setAccessToken("");
			}
		});

		return () => data.subscription.unsubscribe();
	});
	// #endregion

	// #region Refs
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	async function signUpUser(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Input values
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		// Check input values
		try {
			if (email == undefined || email === "") throw new Error("auth/invalid-email");
			if (password == undefined) throw new Error("auth/password-missing");
			if (password.length < 6) throw new Error("auth/password-too-short");
		} catch (err) {
			console.log("Error signing up the user.\n", err);
			return;
		}

		// Sign up user
		try {
			const { data, error } = await supabase.auth.signUp({
				email: email as string,
				password: password as string,
			});

			// Check if there was an error
			if (error != null) {
				console.log(error.code);
				throw error;
			}

			// Log data
			console.log("Data from auth: ", data);
		} catch (err) {
			console.log("Error adding the user to Supabase.\n", err);
		}
	}

	async function signInUser(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Input values
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		// Check input values
		try {
			if (email == undefined || email === "") throw new Error("auth/invalid-email");
			if (password == undefined) throw new Error("auth/password-missing");
			if (password.length < 6) throw new Error("auth/password-too-short");
		} catch (err) {
			console.log("Error signing up the user.\n", err);
			return;
		}

		// Sign in user
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email as string,
				password: password as string,
			});

			// Check if there is an error
			if (error != null) {
				console.log(error.code);
				throw error;
			}

			// Log data
			console.log("Sign in data: ", data);
		} catch (err) {
			console.log("Error signing in the user to Supabase.\n", err);
		}
	}

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

			{/* No user */}
			{accessToken === "" && (
				<>
					<h3>Sign Up</h3>
					<form onSubmit={signUpUser}>
						<label htmlFor="signUpEmail">Email:</label>
						<input
							type="email"
							id="signUpEmail"
							placeholder="Email"
							required
							ref={emailRef}
						/>
						<br />

						<label htmlFor="signUpPassword">Password:</label>
						<input
							type="password"
							id="signUpPassword"
							placeholder="Password"
							required
							ref={passwordRef}
						/>
						<br />

						<button type="submit">Sign Up</button>
					</form>

					<br />
					<br />

					<h3>Sign In</h3>
					<form onSubmit={signInUser}>
						<label htmlFor="sinInEmail">Email:</label>
						<input type="email" id="sinInEmail" placeholder="Email" required ref={emailRef} />
						<br />

						<label htmlFor="signInPassword">Password:</label>
						<input
							type="password"
							id="signInPassword"
							placeholder="Password"
							required
							ref={passwordRef}
						/>
						<br />

						<button type="submit">Sign In</button>
					</form>
				</>
			)}

			{/* Signed in user */}
			{accessToken !== "" && (
				<>
					<p>JWT: {accessToken}</p>
					<button onClick={signOutUser}>Sign Out</button>
				</>
			)}
		</>
	);
}

export default App;
