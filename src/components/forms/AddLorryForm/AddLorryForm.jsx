import { useState } from "react";
import { CUSTOMER_NAMES } from "../../../constants/customer-names";
import { MATERIAL_NAMES } from "../../../constants/material-names";
import "./AddLorryForm.css";

export default function AddLorryForm({ onSubmit }) {
    const [regNum, setRegNum] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [collectionRefNum, setCollectionRefNum] = useState("");
    const [userId, setUserId] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            regNum: regNum || undefined,
            materialName,
            customerName,
            collectionRefNum,
            updatedBy: {
                userId,
            },
            comment: comment || undefined,
        });

        setRegNum("");
        setMaterialName("");
        setCustomerName("");
        setCollectionRefNum("");
        setUserId("");
        setComment("");
    };

    return (
        <form className="lorry-form" onSubmit={handleSubmit}>
            <h3>Add New Lorry</h3>

            <label>
                Lorry Registration Number (optional)
                <input
                    type="text"
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value)}
                />
            </label>

            <label>
                Material Name
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
                Customer Name
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
                Collection Reference Number
                <input
                    type="text"
                    value={collectionRefNum}
                    onChange={(e) => setCollectionRefNum(e.target.value)}
                    required
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

            <button type="submit" className="submit-btn">
                Add Lorry
            </button>
        </form>
    );
}
