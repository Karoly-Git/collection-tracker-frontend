import StatusBadge from "../statusBadge/StatusBadge";
import type { Lorry } from "../../../types/lorry";

interface LorryTableRowProps {
    lorry: Lorry;
}

export default function LorryTableRow({ lorry }: LorryTableRowProps) {
    const {
        materialName,
        customerName,
        collectionRefNum,
        currentStatus
    } = lorry;

    return (
        <tr className="lorry-table-row">
            <td className="material-name">{materialName}</td>
            <td className="customer-name">{customerName}</td>
            <td className="collection-ref-number">{collectionRefNum}</td>
            <StatusBadge currentStatus={currentStatus} />
        </tr>
    );
}
