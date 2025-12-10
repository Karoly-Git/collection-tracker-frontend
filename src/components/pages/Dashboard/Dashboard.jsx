import { useState } from "react";
import Button from '../../ui/button/Button';
import { GoPlus as PlusIcon } from "react-icons/go";

import Modal from "../../ui/modal/Modal";
import AddLorryForm from "../../forms/AddLorryForm/AddLorryForm";

import "./Dashboard.css";

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdd = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const handleFormSubmit = (lorryData) => {
        console.log("New Lorry Added:", lorryData);

        // TODO: Save to global state or backend

        setIsModalOpen(false);
    };

    return (
        <div className='dashboard'>
            <div className='dashboard-head'>
                <h2>Lorry Status</h2>
                <Button
                    icon={PlusIcon}
                    text="Add Lorry"
                    onClick={handleAdd}
                />
            </div>

            <Modal isOpen={isModalOpen} onClose={handleClose}>
                <AddLorryForm onSubmit={handleFormSubmit} />
            </Modal>
        </div>
    );
}
