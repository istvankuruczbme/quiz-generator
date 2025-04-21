import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import InlineIconButton from "../../../../../components/ui/Button/InlineIconButton/InlineIconButton";
import { faCircleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../../../../../components/ui/Tooltip/Tooltip";
import "./TfidfStrategyLabel.css";

type TfidfStrategyLabelProps = HTMLAttributes<HTMLDivElement> & {
	setShowModal: Dispatch<SetStateAction<boolean>>;
};

const TfidfStrategyLabel: FC<TfidfStrategyLabelProps> = ({ setShowModal }) => {
	return (
		<FlexContainer gap="0.5rem">
			<span>TF-IDF</span>

			<div>
				<InlineIconButton icon={faCircleExclamation} />
				<Tooltip>
					<Tooltip.Text>Recommended only for english documents.</Tooltip.Text>
				</Tooltip>
			</div>

			<InlineIconButton icon={faCircleInfo} onClick={() => setShowModal(true)} />
		</FlexContainer>
	);
};

export default TfidfStrategyLabel;
