import { useState } from "react";
import { IoSearchSharp as SearchIcon } from "react-icons/io5";
import './SearchBar.scss';

export default function SearchBar() {
    const [inputValue, setInputValue] = useState<string>("");

    const userLoggedIn = true;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value.toLowerCase().replace(/\s{2,}/g, " "));
    };

    return (
        <div className="searchbar">
            <SearchIcon className="search-icon" />
            <input
                type="text"
                placeholder="Search collections..."
                value={inputValue}
                onChange={handleInputChange}
                disabled={!userLoggedIn}
            />

            {inputValue && (
                <button
                    type="button"
                    className="reset-btn"
                    onClick={() => setInputValue("")}
                >
                    ✕
                </button>
            )}
        </div>
    );
}