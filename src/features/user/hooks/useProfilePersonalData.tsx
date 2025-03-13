import { useEffect, useState } from "react";
import useUser from "../../../contexts/UserContext/useUser";
import defaultUserPhotoUrl from "../assets/defaultUserPhotoUrl";

const useProfilePersonalData = () => {
	// #region States
	const [photoUrl, setPhotoUrl] = useState("");
	const [name, setName] = useState("");
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
		} else {
			setPhotoUrl(user.photoUrl || defaultUserPhotoUrl);
			setName(user.name);
		}
	}, [user, loading]);

	return { photoUrl, setPhotoUrl, name, setName };
};

export default useProfilePersonalData;
