import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { IoSearchSharp as SearchIcon } from "react-icons/io5";
import './SearchBar.scss';


type SearchBarProps = {
    setSearchValue: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({ setSearchValue }: SearchBarProps) {
    const [inputValue, setInputValue] = useState<string>("");

    const userLoggedIn = true;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value.toLowerCase().replace(/\s{2,}/g, " ");
        setInputValue(value);
        setSearchValue(value);
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
                    onClick={() => {
                        setInputValue("");
                        setSearchValue("")
                    }}
                >
                    ✕
                </button>
            )}
        </div>
    );
}