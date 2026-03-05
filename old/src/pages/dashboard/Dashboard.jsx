import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Button from "../../components/ui/button/Button";
import { GoPlus as PlusIcon } from "react-icons/go";
import { IoSearchSharp as SearchIcon } from "react-icons/io5";
import { RxReset as ResetFiltersIcon } from "react-icons/rx";
import { IoTodaySharp as TodayIcon } from "react-icons/io5";

import "./Dashboard.scss";

import Modal from "../../components/ui/modal/Modal";
import CollectionTable from "../../components/table/CollectionTable/CollectionTable";
import AddCollectionForm from "../../components/forms/AddCollectionForm/AddCollectionForm";
import InfoForm from "../../components/forms/InfoForm/InfoForm";

import { openModal, closeModal } from "../../state/collection/modalSlice";
import UpdateStatusForm from "../../components/forms/updateStatusForm/UpdateStatusForm";
import DeleteCollectionForm from "../../components/forms/DeleteCollectionForm.jsx/DeleteCollectionForm";

import { COLLECTION_STATUSES } from "../../constants/collection-statuses";
import { formatText } from "../../utils/formatText";
import { STATUS_ICONS } from "../../constants/status-icons";

export default function Dashboard() {
    const userLoggedIn = true;
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState("");
    const [showTodayOnly, setShowTodayOnly] = useState(true);

    /** ✅ ALL STATUSES CHECKED BY DEFAULT */
    const [statusFilters, setStatusFilters] = useState(() =>
        Object.values(COLLECTION_STATUSES).reduce((acc, status) => {
            acc[status] = true;
            return acc;
        }, {})
    );

    const activeModal = useSelector((state) => state.modal.activeModal);
    const collectionId = useSelector((state) => state.modal.clickedCollectionId);

    // ✅ CHANGED: read more states so we can disable Escape while busy
    const {
        collections,
        loading,
        addCommentLoading,
        addCollectionStatus,
        updateStatusStatus,
    } = useSelector((state) => state.collections);

    const collection = collections.find((c) => c.id === collectionId);

    // ✅ NEW: modal busy state
    const isModalBusy =
        loading ||
        addCommentLoading ||
        addCollectionStatus === "loading" ||
        updateStatusStatus === "loading";

    /* ─────────────────────────────
         FILTER STATE CHECKS
         (SEARCH EXCLUDED)
      ───────────────────────────── */

    const isStatusFilterActive = Object.values(statusFilters).some(
        (checked) => checked === false
    );

    const isAnyFilterApplied = !showTodayOnly || isStatusFilterActive;

    /* ─────────────────────────────
         HANDLERS
      ───────────────────────────── */

    const handleOpenModal = (name) => {
        dispatch(openModal({ name }));
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value.toLowerCase().replace(/\s{2,}/g, " "));
    };

    const handleStatusToggle = (status) => {
        setStatusFilters((prev) => ({
            ...prev,
            [status]: !prev[status],
        }));
    };

    const resetFilters = () => {
        setShowTodayOnly(true);
        setStatusFilters(
            Object.values(COLLECTION_STATUSES).reduce((acc, status) => {
                acc[status] = true;
                return acc;
            }, {})
        );
    };

    return (
        <div className="dashboard">
            {/* =========================
               HEADER
            ========================== */}
            <div className="dashboard-head">
                {/* =========================
               SEARCH
            ========================== */}
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
                                onClick={() => setInputValue("")}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>


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
                <div className="dashboard-filters">
                    {/* Today only chip */}

                    <label
                        className={`status-chip ${showTodayOnly ? "active" : ""}`}
                    >
                        <input
                            type="checkbox"
                            checked={showTodayOnly}
                            onChange={(e) => setShowTodayOnly(e.target.checked)}
                        />
                        <span className="chip-label">
                            <TodayIcon className="chip-icon" />
                            <span className="chip-text">Today</span>
                        </span>
                    </label>

                    {Object.values(COLLECTION_STATUSES).map((status) => {
                        const Icon = STATUS_ICONS[status];

                        return (
                            <label
                                key={status}
                                className={`status-chip status-${status.toLowerCase()} ${statusFilters[status] ? "active" : ""
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={statusFilters[status]}
                                    onChange={() => handleStatusToggle(status)}
                                />

                                <span className="chip-label">
                                    {Icon && <Icon className="chip-icon" />}
                                    <span className="chip-text">{formatText(status)}</span>
                                </span>
                            </label>
                        );
                    })}

                    {/* RESET FILTERS (ONLY WHEN CHIP FILTERS CHANGE) */}
                    {isAnyFilterApplied && (
                        <Button
                            type="button"
                            icon={ResetFiltersIcon}
                            text=""
                            className="btn icon-btn"
                            onClick={resetFilters}
                        />
                    )}
                </div>
            </div>

            {/* =========================
               TABLE
            ========================== */}
            <CollectionTable
                searchValue={inputValue}
                showTodayOnly={showTodayOnly}
                activeStatuses={statusFilters}
            />

            {/* =========================
               MODALS
            ========================== */}
            <Modal
                isOpen={activeModal === "add"}
                escapeAction={handleCloseModal}
                disableEscape={isModalBusy} // ✅ NEW
                modalTitle="Add Collection"
            >
                <AddCollectionForm onCancel={handleCloseModal} />
            </Modal>

            <Modal
                isOpen={activeModal === "status"}
                escapeAction={handleCloseModal}
                disableEscape={isModalBusy} // ✅ NEW
                modalTitle="Update Collection Status"
            >
                <UpdateStatusForm onCancel={handleCloseModal} />
            </Modal>

            <Modal
                isOpen={activeModal === "info"}
                escapeAction={handleCloseModal}
                disableEscape={isModalBusy} // ✅ NEW
                modalTitle="Collection Details"
            >
                <InfoForm collection={collection} onCancel={handleCloseModal} />
            </Modal>

            <Modal
                isOpen={activeModal === "delete"}
                escapeAction={handleCloseModal}
                disableEscape={isModalBusy} // ✅ NEW
                modalTitle="Confirm Delete Collection"
            >
                <DeleteCollectionForm onCancel={handleCloseModal} />
            </Modal>
        </div>
    );
}
