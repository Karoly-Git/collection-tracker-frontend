import { useState } from "react";
import Button from "../../components/ui/button/Button";
import { GoPlus as PlusIcon } from "react-icons/go";

import Modal from "../../components/ui/modal/Modal";
import LorryTable from "../../components/table/LorryTable/LorryTable";
import AddLorryForm from "../../components/forms/AddLorryForm/AddLorryForm";

import "./Dashboard.css";

export default function Dashboard() {
    const [userLoggedIn] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdd = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const handleFormSubmit = (lorryData) => {
        console.log("New Lorry Added:", lorryData);
        setIsModalOpen(false);
    };

    return (
        <div className="dashboard">
            <div className="dashboard-head">
                <h2>Lorry Overview</h2>
                {userLoggedIn && (
                    <Button icon={PlusIcon} text="Add Lorry" onClick={handleAdd} />
                )}
            </div>

            <LorryTable />

            <Modal isOpen={isModalOpen} onClose={handleClose}>
                <AddLorryForm onSubmit={handleFormSubmit} />
            </Modal>
        </div>
    );
}
