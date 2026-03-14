import Table from '@/components/table/Table';
import SearchBar from '@/components/ui/searchbar/SearchBar';
import FilterBar from '@/components/ui/filter-bar/FilterBar';

import { GoPlus as PlusIcon } from "react-icons/go";

import Button from '@/components/ui/button/Button';
import './Dashboard.scss';
import { useEffect, useState } from 'react';
import { COLLECTION_STATUSES } from '@/constants/collection-statuses';
import Spinner from '@/components/ui/spinner/Spinner';
import type { Collection } from '@/types/collection';
import { getTodayCollections } from '@/api/collection';
import Error from '@/components/ui/error/Error';

export default function Dashboard() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [filtersList, setFiltersList] = useState<string[]>([...Object.keys(COLLECTION_STATUSES), "TODAY"]);

    const [collections, setCollections] = useState<Collection[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const fetchCollections = async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const result = await getTodayCollections();
            setCollections(result);
        } catch (error) {
            console.error("Failed to fetch collections:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        <>
            {isError ? (
                <Error
                    message="Failed to load collections."
                    onRetry={fetchCollections}
                />) : isLoading ? (
                    <div className="loading-spinner-container">
                        <Spinner />
                    </div>
                ) : (
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

                    <FilterBar
                        filtersList={filtersList}
                        setFiltersList={setFiltersList}
                    />

                    <Table
                        searchValue={searchValue}
                        filtersList={filtersList}
                        collections={collections}
                    />
                </div>
            )}
        </>
    );
}
