import { useEffect, useState } from "react";
import useUser from "../../../contexts/UserContext/useUser";
import defaultUserPhotoUrl from "../assets/defaultUserPhotoUrl";

const useProfilePersonalData = () => {
	// #region States
	const [photoUrl, setPhotoUrl] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	// #endregion

	// #region Hooks
	const { user, loading } = useUser();
	// #endregion

	useEffect(() => {
		// Wait until user loads
		if (loading) return;

		if (user == null) {
			setPhotoUrl(defaultUserPhotoUrl);
			setName("");
			setEmail("");
		} else {
			setPhotoUrl(user.photoUrl || defaultUserPhotoUrl);
			setName(user.name);
			setEmail(user.email);
		}
	}, [user, loading]);

	return { photoUrl, setPhotoUrl, name, setName, email, setEmail };
};

export default useProfilePersonalData;
