import {
	faLandmark,
	faGlobe,
	faFlask,
	faBook,
	faPalette,
	faMusic,
	faFilm,
	faFootballBall,
	faMicrochip,
	faBalanceScale,
	faUtensils,
	faPlane,
	faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

const categoryIcons = {
	history: faLandmark,
	geography: faGlobe,
	science: faFlask,
	literature: faBook,
	art: faPalette,
	music: faMusic,
	movies: faFilm,
	sports: faFootballBall,
	technology: faMicrochip,
	politics: faBalanceScale,
	food: faUtensils,
	travel: faPlane,
	"general knowledge": faLightbulb,
} as const;

export default categoryIcons;
