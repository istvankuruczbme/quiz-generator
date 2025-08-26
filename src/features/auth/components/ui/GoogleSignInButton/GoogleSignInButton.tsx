import { FC, useState } from "react";
// Components
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import { ButtonProps } from "../../../../../components/ui/Button/Button";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Hooks
import useError from "../../../../error/hooks/useError";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
import signInWithGoogle from "../../../services/signInWithGoogle";
// CSS
import "./GoogleSignInButton.css";

type GoogleSignInButtonProps = ButtonProps;

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ className }) => {
	// #region States
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { setError } = useError();
	//#endregion

	//#region Functions
	async function handleGoogleSignInClick() {
		setLoading(true);

		try {
			// Sign in with Google
			await signInWithGoogle();
		} catch (err) {
			setError(err);
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
