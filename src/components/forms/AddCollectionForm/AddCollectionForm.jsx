import { useState } from "react";
import { CUSTOMER_NAMES } from "../../../constants/customer-names";
import { MATERIAL_NAMES } from "../../../constants/material-names";
import Button from "../../ui/button/Button";
import { useDispatch } from "react-redux";

import "../FormStyle.css";
import { addNewCollection } from "../../../state/collection/collectionSlice";

export default function AddCollectionForm({ onCancel }) {
    const [regNum, setRegNum] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [collectionRefNum, setCollectionRefNum] = useState("");
    const [userId, setUserId] = useState("");
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCollection = {
            materialName,
            customerName,
            collectionRefNum,
            lorryRegNum: regNum || undefined,
            updatedByUserId: userId,
            comment: comment || undefined,
        };

        dispatch(
            addNewCollection(newCollection)
        );

        // Clear form fields after submission
        setRegNum("");
        setMaterialName("");
        setCustomerName("");
        setCollectionRefNum("");
        setUserId("");
        setComment("");
    };

    return (
        <form className="form add-collection-form" onSubmit={handleSubmit}>
            <h2>Add Collection</h2>

            <label>
                Material
                <select
                    value={materialName}
                    onChange={(e) => setMaterialName(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Select material
                    </option>

                    {Object.entries(MATERIAL_NAMES).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Customer
                <select
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Select customer
                    </option>

                    {Object.entries(CUSTOMER_NAMES).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Reference number
                <input
                    type="text"
                    value={collectionRefNum}
                    onChange={(e) => setCollectionRefNum(e.target.value)}
                    required
                />
            </label>

            <label>
                Vehicle reg number (optional)
                <input
                    type="text"
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value)}
                />
            </label>


            <label>
                Updated By (User ID)
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    placeholder="Later it will come from login"
                />
            </label>

            <label>
                Comment (optional)
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </label>

            <div className="actions">
                <Button
                    type="button"
                    text="Cancel"
                    className="btn reject"
                    onClick={onCancel}
                />

                <Button
                    type="submit"
                    text="Add Collection"
                    className="btn accept"
                />
            </div>
        </form>
    );
}
