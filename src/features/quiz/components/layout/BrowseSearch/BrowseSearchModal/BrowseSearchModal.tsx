import { useState } from "react";
import Checkbox from "../../../../../../components/form/Checkbox/Checkbox";
import Overlay from "../../../../../../components/layout/Overlay/Overlay";
import Button from "../../../../../../components/ui/Button/Button";
import Text from "../../../../../../components/ui/Text/Text";
import useCategories from "../../../../../category/hooks/useCategories";
import Modal from "../../../../../ui/modal/components/layout/Modal/Modal";
import ModalProvider from "../../../../../ui/modal/contexts/ModalContext/ModalProvider";
import { ModalProps } from "../../../../../ui/modal/types/modalTypes";
import useQuizSearch from "../../../../contexts/QuizSearchContext/useQuizSearch";
import "./BrowseSearchModal.css";

type Props = ModalProps;

const BrowseSearchModal = ({ show, setShow }: Props) => {
	// #region Hooks
	const { data, updateData } = useQuizSearch();
	const { categories } = useCategories();
	// #endregion

	// #region States
	const [categoryIds, setCategoryIds] = useState<string[]>(data.selectedCategories);
	// #endregion

	// #region Functions
	function handleCategoryChange(categoryId: string) {
		if (categoryIds.includes(categoryId)) {
			setCategoryIds((ids) => ids.filter((id) => id !== categoryId));
		} else {
			setCategoryIds((ids) => [...ids, categoryId]);
		}
	}

	function handleResetClick() {
		setCategoryIds([]);
	}

	function handleSaveClick() {
		updateData({ selectedCategories: categoryIds });
		setShow(false);
	}
	// #endregion

	return (
		<ModalProvider show={show} setShow={setShow}>
			<Overlay>
				<Modal>
					<Modal.Header>
						<Modal.Title>Filter quizzes</Modal.Title>
						<Modal.Close />
					</Modal.Header>

					<Modal.Body>
						<Text>Select the categories you are interested in.</Text>

						<div className="browseSearchModal__categories">
							{categories.map((category) => (
								<Checkbox
									key={category.id}
									label={category.name}
									checked={categoryIds.includes(category.id)}
									onChange={() => handleCategoryChange(category.id)}
								/>
							))}
						</div>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="neutral" outlined onClick={handleResetClick}>
							Reset
						</Button>
						<Modal.Cancel />
						<Button variant="accent" onClick={handleSaveClick}>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
			</Overlay>
		</ModalProvider>
	);
};

export default BrowseSearchModal;
