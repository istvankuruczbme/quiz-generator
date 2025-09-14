import { ImgHTMLAttributes } from "react";
import "./CardImage.css";
import addPropClassName from "../../../../utils/addPropClassName";

type Props = ImgHTMLAttributes<HTMLImageElement>;

const CardImage = ({ className, ...rest }: Props) => {
	return <img className={`cardImage${addPropClassName(className)}`} {...rest} />;
};

export default CardImage;
