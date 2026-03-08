import Table from '@/components/table/Table';
import SearchBar from '@/components/ui/searchbar/SearchBar';
import FilterBar from '@/components/ui/filter-bar/FilterBar';

import { GoPlus as PlusIcon } from "react-icons/go";

import Button from '@/components/ui/button/Button';
import './Dashboard.scss';
import { useState } from 'react';
import { COLLECTION_STATUSES } from '@/constants/collection-statuses';

export default function Dashboard() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [filtersList, setFiltersList] = useState<string[]>([...Object.keys(COLLECTION_STATUSES), "TODAY"]);

    return (
        <div className='dashboard'>
            <div className='controls'>
                <SearchBar setSearchValue={setSearchValue} />

                <Button
                    variant='add-btn'
                    icon={PlusIcon}
                    text='Add collection'
                    onClick={() => { }}
                />
            </div>

            <FilterBar setFiltersList={setFiltersList} />

            <Table
                searchValue={searchValue}
                filtersList={filtersList}
            />
        </div>
    )
}
