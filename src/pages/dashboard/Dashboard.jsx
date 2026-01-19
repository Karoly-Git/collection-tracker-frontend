import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Button from "../../components/ui/button/Button";
import { GoPlus as PlusIcon } from "react-icons/go";
import { IoSearchSharp as SearchIcon } from "react-icons/io5";

import "./Dashboard.css";

import Modal from "../../components/ui/modal/Modal";
import CollectionTable from "../../components/table/CollectionTable/CollectionTable";
import AddCollectionForm from "../../components/forms/AddCollectionForm/AddCollectionForm";
import CollectionInfoForm from "../../components/forms/CollectionInfoForm/CollectionInfoForm";


import { openModal, closeModal } from "../../state/collection/modalSlice";
import UpdateStatusForm from "../../components/forms/updateStatusForm/UpdateStatusForm";
import DeleteCollectionForm from "../../components/forms/DeleteCollectionForm.jsx/DeleteCollectionForm";

export default function Dashboard() {
    const userLoggedIn = true;
    const [inputValue, setInputValue] = useState("");
    const [showTodayOnly, setShowTodayOnly] = useState(true);

    const dispatch = useDispatch();

    const activeModal = useSelector((state) => state.modal.activeModal);

    const handleOpenModal = (name) => {
        dispatch(openModal({ name }));
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleResetSearch = () => {
        setInputValue("");
    };

    const collectionId = useSelector(
        (state) => state.modal.clickedCollectionId
    );

    const { collections } = useSelector(
        (state) => state.collections
    );

    const collection = collections.find(
        (c) => c.id === collectionId
    );

    const handleInputChange = (e) => {
        const value = e.target.value
            .toLowerCase()
            .replace(/\s{2,}/g, ' '); // only collapse 2+ spaces into 1

        setInputValue(value);
    };

    return (
        <div className="dashboard">
            <div className="dashboard-head">
                <h2 className="dashboard-title">Collection Overview</h2>

                {userLoggedIn && (
                    <Button
                        icon={PlusIcon}
                        text="Add Collection"
                        className="btn add"
                        onClick={() => handleOpenModal("add")}
                    />
                )}
            </div>

            <div className="dashboard-controls">
                <div className="dashboard-search">
                    <SearchIcon className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search collections..."
                        value={inputValue}
                        onChange={handleInputChange}
                        disabled={!userLoggedIn}
                    />

                    {inputValue && (
                        <button
                            type="button"
                            className="reset-btn"
                            onClick={handleResetSearch}
                            aria-label="Clear search input"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <label className="dashboard-checkbox">
                    <input
                        type="checkbox"
                        checked={showTodayOnly}
                        onChange={(e) => setShowTodayOnly(e.target.checked)}
                    />
                    Today's collections only
                </label>
            </div>

            <CollectionTable
                searchValue={inputValue}
                showTodayOnly={showTodayOnly}
            />

            <Modal
                isOpen={activeModal === "add"}
                modalTitle="Add Collection"
            >
                <AddCollectionForm
                    onCancel={handleCloseModal}
                />
            </Modal>

            <Modal
                isOpen={activeModal === "status"}
                modalTitle="Update Collection Status"
            >
                <UpdateStatusForm
                    onCancel={handleCloseModal}
                />
            </Modal>

            <Modal
                isOpen={activeModal === "info"}
                modalTitle="Collection Details"
            >
                <CollectionInfoForm
                    collection={collection}
                    onCancel={handleCloseModal}
                />
            </Modal>

            <Modal
                isOpen={activeModal === "delete"}
                modalTitle="Confirm Delete Collection"
            >
                <DeleteCollectionForm
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
}
