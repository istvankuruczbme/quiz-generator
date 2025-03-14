import { FC, HTMLAttributes } from "react";
// Components
import { Link } from "react-router-dom";
// Function
import createCustomerPortal from "../../../services/createCustomerPortal";
import useUser from "../../../../../contexts/UserContext/useUser";
// CSS
import "./ProfileSubscriptionSection.css";

type ProfileSubscriptionSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileSubscriptionSection: FC<ProfileSubscriptionSectionProps> = () => {
	// #region Hooks
	const { user } = useUser();
	//#endregion

	//#region Functions
	async function handleCustomerPortalClick() {
		// Check user
		if (user == null) return;

		try {
			// Get session URL
			const { url } = await createCustomerPortal(user.id);

			// Go to URL
			window.location.href = url;
		} catch (err) {
			console.log("Error getting to customer portal.", err);
		}
	}
	//#endregion

	return (
		<div>
			<h2>Subscription</h2>

			<button onClick={handleCustomerPortalClick}>My subscription</button>

			<Link to="/profile/subscription">
				<button>Change subscription</button>
			</Link>
		</div>
	);
};

export default ProfileSubscriptionSection;
