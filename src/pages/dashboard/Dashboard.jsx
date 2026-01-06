import { useState } from "react";
import Button from "../../components/ui/button/Button";
import { GoPlus as PlusIcon } from "react-icons/go";

import "./Dashboard.css";

import Modal from "../../components/ui/modal/Modal";
import CollectionTable from "../../components/table/CollectionTable/CollectionTable";
import AddCollectionForm from "../../components/forms/AddCollectionForm/AddCollectionForm";

export default function Dashboard() {
    const [userLoggedIn] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddClick = () => setIsAddModalOpen(true);
    const handleAddClose = () => setIsAddModalOpen(false);

    const handleAddFormSubmit = (lorryData) => {
        console.log("New Lorry Added:", lorryData);
        setIsAddModalOpen(false);
    };

    return (
        <div className="dashboard">
            <div className="dashboard-head">
                <h2>Collection Overview</h2>
                {userLoggedIn && (
                    <Button icon={PlusIcon} text="Add Collection" onClick={handleAddClick} />
                )}
            </div>

            <CollectionTable />

            <Modal isOpen={isAddModalOpen} onClose={handleAddClose}>
                <AddCollectionForm onSubmit={handleAddFormSubmit} onCancel={handleAddClose} />
            </Modal>
        </div>
    );
}
