import { useEffect, useState } from "react";
import { CUSTOMER_NAMES } from "../../../constants/customer-names";
import { MATERIAL_NAMES } from "../../../constants/material-names";
import Button from "../../ui/button/Button";
import Spinner from "../../ui/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";

import "../FormStyle.scss";
import "./AddCollectionForm.scss";
import {
    addNewCollection,
    resetAddCollectionState,
} from "../../../state/collection/collectionSlice";

import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

const AUTO_CLOSE_SECONDS = 10;

export default function AddCollectionForm({ onCancel }) {
    const dispatch = useDispatch();

    /* ---------- Local state ---------- */
    const [lorryRegNum, setLorryRegNum] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [collectionRefNum, setCollectionRefNum] = useState("");
    const [updatedByUserId, setUpdatedByUserId] = useState("");
    const [comment, setComment] = useState("");

    const [secondsLeft, setSecondsLeft] = useState(AUTO_CLOSE_SECONDS);

    /* ---------- Redux state ---------- */
    const addCollectionStatus = useSelector(
        (state) => state.collections.addCollectionStatus
    );
    const addCollectionError = useSelector(
        (state) => state.collections.addCollectionError
    );
    const addCollectionSuccessMessage = useSelector(
        (state) => state.collections.addCollectionSuccessMessage
    );

    const isValid =
        materialName && customerName && collectionRefNum && updatedByUserId;

    const isBusy = addCollectionStatus === "loading";
    const isAdded = addCollectionStatus === "succeeded";
    const isFailed = addCollectionStatus === "failed";

    /* ---------- Reset redux state when form mounts/unmounts ---------- */
    useEffect(() => {
        dispatch(resetAddCollectionState());

        return () => {
            dispatch(resetAddCollectionState());
        };
    }, [dispatch]);

    /* ---------- Auto close after success (same as DeleteCollectionForm) ---------- */
    useEffect(() => {
        if (!isAdded) return;

        setSecondsLeft(AUTO_CLOSE_SECONDS);

        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isAdded]);

    useEffect(() => {
        if (secondsLeft <= 0 && isAdded) {
            onCancel();
        }
    }, [secondsLeft, isAdded, onCancel]);

    /* ---------- Submit ---------- */
    async function handleSubmit(e) {
        e.preventDefault();
        if (isBusy) return;

        const newCollection = {
            materialName,
            customerName,
            collectionRefNum,
            lorryRegNum: lorryRegNum || undefined,
            updatedByUserId,
            comment: comment || undefined,
            timestamp: new Date().toISOString(),
        };

        try {
            await dispatch(addNewCollection(newCollection)).unwrap();

            // ✅ Clear fields after success
            setLorryRegNum("");
            setMaterialName("");
            setCustomerName("");
            setCollectionRefNum("");
            setUpdatedByUserId("");
            setComment("");
        } catch (err) {
            console.error("Add collection failed:", err);
        }
    }

    /* ---------- Header content ---------- */
    const renderHeader = () => {
        if (isAdded) {
            return (
                <>
                    <FaCheck className="icon success" />
                    <span>
                        {addCollectionSuccessMessage || "Collection added successfully"}
                    </span>
                </>
            );
        }

        if (isFailed) {
            return (
                <>
                    <FaExclamationTriangle className="icon warning" />
                    <span>{addCollectionError || "Failed to add collection"}</span>
                </>
            );
        }

        if (isBusy) {
            return (
                <>
                    <Spinner size={26} inline />
                    <span>Adding collection… Please wait</span>
                </>
            );
        }

        return null;
    };

    const headerContent = renderHeader();

    return (
        <form className="form add-collection-form" onSubmit={handleSubmit}>
            <div className="form-header">
                {headerContent && (
                    <h2
                        className={`warning-text ${isAdded ? "success" : isFailed ? "error" : ""
                            }`}
                        aria-live="polite"
                    >
                        {headerContent}
                    </h2>
                )}

                {isAdded && (
                    <p className="auto-close-text">
                        (Auto closing in <strong>{secondsLeft}</strong> second
                        {secondsLeft !== 1 ? "s" : ""})
                    </p>
                )}
            </div>

            {/* Form fields only when idle or error */}
            {!isAdded && !isBusy && (
                <>
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
                            value={lorryRegNum}
                            onChange={(e) => setLorryRegNum(e.target.value)}
                        />
                    </label>

                    <label>
                        Updated By (User ID)
                        <input
                            type="text"
                            value={updatedByUserId}
                            onChange={(e) => setUpdatedByUserId(e.target.value)}
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
                </>
            )}

            <div className="actions">
                {isAdded && (
                    <Button
                        type="button"
                        text="Close"
                        className="btn accept"
                        onClick={onCancel}
                    />
                )}

                {!isAdded && !isBusy && (
                    <>
                        <Button
                            type="button"
                            text="Cancel"
                            className="btn reject"
                            onClick={() => {
                                dispatch(resetAddCollectionState());
                                onCancel();
                            }}
                        />

                        {isValid && (
                            <Button
                                type="submit"
                                text={isFailed ? "Retry Add" : "Add Collection"}
                                className="btn accept"
                            />
                        )}
                    </>
                )}
            </div>
        </form>
    );
}
