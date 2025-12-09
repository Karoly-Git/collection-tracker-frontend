import Button from '../../ui/Button/Button';
import { GoPlus } from "react-icons/go";

import "./Dashboard.css";

export default function Dashboard() {
    const handleAdd = () => {
        console.log("Add Lorry clicked");
        // later: open modal / show form / navigate
    };

    return (
        <div className='dashboard'>
            <div className='dashboard-head'>
                <h2>Lorry Status</h2>
                <Button
                    icon={GoPlus}
                    text="Add Lorry"
                    onClick={handleAdd}
                />
            </div>
        </div>
    )
}
