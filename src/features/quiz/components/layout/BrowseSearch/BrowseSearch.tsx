import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../../../components/form/Input/Input";
import Section from "../../../../../components/layout/Section/Section";
import Button from "../../../../../components/ui/Button/Button";
import BrowseSearchModal from "./BrowseSearchModal/BrowseSearchModal";
import useQuizSearch from "../../../contexts/QuizSearchContext/useQuizSearch";
import "./BrowseSearch.css";

const BrowseSearch = () => {
	// #region States
	const [showModal, setShowModal] = useState(false);
	// #endregion

	// #region Hooks
	const { data, updateData } = useQuizSearch();
	// #endregion

	return (
		<Section>
			<BrowseSearchModal show={showModal} setShow={setShowModal} />

			<div className="browseSearch">
				<Input
					type="search"
					placeholder="Search quiz"
					className="browseSearch__input"
					value={data.searchText}
					onChange={(e) => updateData({ searchText: e.target.value })}
				/>

				<Button
					variant="primary"
					rounded
					className="browseSearch__button"
					onClick={() => setShowModal(true)}
				>
					<FontAwesomeIcon icon={faFilter} />

					{data.selectedCategories.length > 0 && (
						<span className="browseSearch__button__badge">
							{data.selectedCategories.length}
						</span>
					)}
				</Button>
			</div>
		</Section>
	);
};

export default BrowseSearch;
