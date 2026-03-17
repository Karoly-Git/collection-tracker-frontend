import "./CollectionCards.scss";

import type { Collection } from "@/types/collection";

import { COLLECTION_STATUSES } from "@/constants/collection-statuses";
import { formatText } from "@/utils/formatText";
import { getTimeSpentInStatus } from "@/utils/getTimeSpentInStatus";
import { getTimeOnSiteAndIndicator } from "@/utils/getTimeOnSiteAndIndicator";

import { useEffect, useState } from "react";

import Button from "@/components/ui/button/Button";

import { BsInfoCircle as InfoIcon } from "react-icons/bs";
import { RiDeleteBin2Line as BinIcon } from "react-icons/ri";

type Props = {
    collection: Collection;
};

export default function CollectionCard({ collection }: Props) {

    const [timeOnSite, setTimeOnSite] = useState("");
    const [urgencyColor, setUrgencyColor] = useState("");

    useEffect(() => {

        function updateTime() {

            const { time, color } =
                getTimeOnSiteAndIndicator(collection.checkedInAt);

            setTimeOnSite(time);
            setUrgencyColor(color);

        }

        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);

    }, [collection.checkedInAt]);

    return (

        <div className="collection-card">

            <div className="card-header">

                <span
                    className="timer"
                    style={{ backgroundColor: urgencyColor }}
                >
                    {timeOnSite}
                </span>

                <span className="reference">
                    {collection.collectionRefNum}
                </span>

            </div>

            <div className="card-body">

                <div className="row">
                    <span className="label">Material</span>
                    <span className="value">{collection.materialName}</span>
                </div>

                <div className="row">
                    <span className="label">Customer</span>
                    <span className="value">{collection.customerName}</span>
                </div>

                <div className="row">
                    <span className="label">Checked in</span>
                    <span className="value">
                        {new Date(collection.checkedInAt).toLocaleDateString()}
                        {" "}
                        {new Date(collection.checkedInAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </span>
                </div>

            </div>

            <div className="card-status">

                <Button
                    variant={COLLECTION_STATUSES[collection.currentStatus].text}
                    icon={COLLECTION_STATUSES[collection.currentStatus].icon}
                    text={formatText(
                        COLLECTION_STATUSES[collection.currentStatus].text
                    )}
                />

                {collection.currentStatus !==
                    COLLECTION_STATUSES.CHECKED_OUT.text &&
                    <span className="status-time">
                        {getTimeSpentInStatus(collection)}
                    </span>
                }

            </div>

            <div className="card-actions">

                <Button
                    variant="info only-icon-btn"
                    icon={InfoIcon}
                />

                <Button
                    variant="delete only-icon-btn"
                    icon={BinIcon}
                />

            </div>

        </div>

    );
}