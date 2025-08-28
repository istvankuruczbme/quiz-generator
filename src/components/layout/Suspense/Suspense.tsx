import { ReactNode } from "react";

type Props = {
	loading: boolean;
	fallback: ReactNode;
	children: ReactNode;
};

const Suspense = ({ loading, fallback, children }: Props) => {
	if (loading) return fallback;
	return children;
};

export default Suspense;
