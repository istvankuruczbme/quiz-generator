import { FC, useState } from "react";
// Components
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import { ButtonProps } from "../../../../../components/ui/Button/Button";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
import signInWithGoogle from "../../../services/signInWithGoogle";
import setNewUserFlag from "../../../utils/setNewUserFlag";
// CSS
import "./GoogleSignInButton.css";

type GoogleSignInButtonProps = ButtonProps;

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ className }) => {
	// #region States
	const [loading, setLoading] = useState(false);
	//#endregion

	//#region Functions
	function handleGoogleSignInClick() {
		setLoading(true);

		try {
			// Sign in with Google
			signInWithGoogle();

			// Set Google sign in flag
			setNewUserFlag();
		} catch (err) {
			console.log("Error signing in with Google.", err);
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<LoadingButton
			variant="primary"
			full
			loading={loading}
			className={`googleSignInButton${addPropClassName(className)}`}
			onClick={handleGoogleSignInClick}
		>
			<FontAwesomeIcon icon={faGoogle} />
			Google
		</LoadingButton>
	);
};

export default GoogleSignInButton;
