// Icons
import { BsInfoCircle as InfoIcon } from "react-icons/bs";
import { RiDeleteBin2Line as BinIcon } from "react-icons/ri";

// UI Components


// Constants
import { COLLECTION_STATUSES } from "@/constants/collection-statuses";

// Types
import type { Collection } from "@/types/collection";

// Functions
import { getTimeSpentInStatus } from "@/utils/getTimeSpentInStatus";
import { useEffect, useState } from "react";
import { getTimeOnSiteAndIndicator } from "@/utils/getTimeOnSiteAndIndicator";
import { formatText } from "@/utils/formatText";
import Button from "@/components/ui/button/Button";

// Types
type TableRowProps = {
    collection: Collection;
    setIsInfoModalOpen: (value: boolean) => void;
    setIsDeleteModalOpen: (value: boolean) => void;
};
export default function TableRow({ collection, setIsInfoModalOpen, setIsDeleteModalOpen }: TableRowProps) {
    const [timeOnSite, setTimeOnSite] = useState<string>("");
    const [urgencyColor, setUrgencyColor] = useState<string>("");

    useEffect(() => {
        function getSpentTime(): void {
            const { time, color } = getTimeOnSiteAndIndicator(collection.checkedInAt);

            setTimeOnSite(time);
            setUrgencyColor(color);
        }

        getSpentTime();

        const interval = setInterval(getSpentTime, 1000);

        return () => clearInterval(interval);
    }, [collection.checkedInAt]);

    return (
        <tr className="collection-table-row">

            {/* Timer */}
            <td>
                <div className="cell-content timer">
                    <span
                        style={{ color: urgencyColor }}
                        className="time"
                    >
                        {timeOnSite}
                    </span>
                </div>
            </td>

            {/* Material */}
            <td className="material-column">
                <div className="cell-content material-name">
                    {collection.materialName}
                </div>

                <div className="time-checked-in">
                    {new Date(collection.checkedInAt).toLocaleDateString()}
                </div>

                <div className="time-checked-in">
                    {new Date(collection.checkedInAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </td>

            {/* Customer */}
            <td className="customer-column">
                <div className="cell-content">
                    {collection.customerName}
                </div>
            </td>

            {/* Reference */}
            <td>
                <div className="cell-content collection-ref-number">
                    {collection.collectionRefNum}
                </div>
            </td>

            {/* Status */}
            <td className="current-status">
                <Button
                    variant={COLLECTION_STATUSES[collection.currentStatus].text}
                    icon={COLLECTION_STATUSES[collection.currentStatus].icon}
                    text={formatText(COLLECTION_STATUSES[collection.currentStatus].text)}
                    onClick={() => { }}
                />

                {collection.currentStatus !== COLLECTION_STATUSES.CHECKED_OUT.text && (
                    <div>{getTimeSpentInStatus(collection)}</div>
                )}
            </td>

            {/* Actions */}
            <td className="action action-column">

                <Button
                    variant="info only-icon-btn"
                    icon={InfoIcon}
                    onClick={() => setIsInfoModalOpen(true)}
                />

                <Button
                    variant="delete only-icon-btn"
                    icon={BinIcon}
                    onClick={() => setIsDeleteModalOpen(true)}
                />

            </td>
        </tr>
    );
}