import { FiLogIn, FiLoader, FiCheckCircle, FiLogOut } from "react-icons/fi";
import { LuForklift } from "react-icons/lu";

export const STATUS_ICONS = {
    CHECKED_IN: FiLogIn,
    LOADING_IN_PROGRESS: LuForklift,
    LOADED: FiCheckCircle,
    CHECKED_OUT: FiLogOut
};
