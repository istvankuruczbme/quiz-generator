import { useMutation, useQueryClient } from "@tanstack/react-query";
import useError from "../../error/hooks/useError";
import updateSubscription from "../services/updateSubscription";
import useUser from "../../../contexts/UserContext/useUser";

type UpdateSubscriptionVariables = {
	priceId: string;
};

function useUpdateSubscription() {
	//#region Hooks
	const queryClient = useQueryClient();
	const { user } = useUser();
	const { setError } = useError();
	// #endregion

	const { mutateAsync, isPending } = useMutation<void, unknown, UpdateSubscriptionVariables>({
		mutationFn: updateSubscription,
		onSuccess: () => {
			// Invalidate user query
			queryClient.invalidateQueries({ queryKey: ["users", user?.id] });
		},
		onError: (err) => {
			setError(err);
		},
	});

	return { mutateAsync, loading: isPending };
}

export default useUpdateSubscription;
