import { HTMLAttributes } from "react";
import CardImage from "./CardImage/CardImage";
import CardBody from "./CardBody/CardBody";
import CardSkeleton from "./CardSkeleton/CardSkeleton";
import addPropClassName from "../../../utils/addPropClassName";
import "./Card.css";

type Props = HTMLAttributes<HTMLDivElement>;

const Card = ({ className, children }: Props) => {
	return <div className={`card${addPropClassName(className)}`}>{children}</div>;
};

// Children
Card.Image = CardImage;
Card.Body = CardBody;
Card.Skeleton = CardSkeleton;

export default Card;
