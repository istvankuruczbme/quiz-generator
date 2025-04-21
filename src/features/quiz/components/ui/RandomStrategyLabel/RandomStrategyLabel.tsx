import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import InlineIconButton from "../../../../../components/ui/Button/InlineIconButton/InlineIconButton";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./RandomStrategyLabel.css";

type RandomStrategyLabelProps = HTMLAttributes<HTMLDivElement> & {
	setShowModal: Dispatch<SetStateAction<boolean>>;
};

const RandomStrategyLabel: FC<RandomStrategyLabelProps> = ({ setShowModal }) => {
	return (
		<FlexContainer gap="0.5rem">
			<span>Random</span>

			<InlineIconButton icon={faCircleInfo} onClick={() => setShowModal(true)} />
		</FlexContainer>
	);
};

export default RandomStrategyLabel;
