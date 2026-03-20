import SearchBar from '@/components/ui/searchbar/SearchBar';
import FilterBar from '@/components/ui/filter-bar/FilterBar';

import { GoPlus as PlusIcon } from "react-icons/go";
import { FaSliders } from "react-icons/fa6";

import Button from '@/components/ui/button/Button';
import './Dashboard.scss';
import { useEffect, useState } from 'react';
import { COLLECTION_STATUSES } from '@/constants/collection-statuses';
import Spinner from '@/components/ui/spinner/Spinner';
import type { Collection } from '@/types/collection';
import { getTodayCollections } from '@/api/collection';
import Message from '@/components/ui/message/Message';
import { currentUser } from '@/constants/users';
import CollectionsView from '@/components/collections/CollectionsView';
import Modal from '@/components/ui/modal/Modal';

export default function Dashboard() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [filtersList, setFiltersList] = useState<string[]>([
        ...Object.keys(COLLECTION_STATUSES),
        "TODAY"
    ]);

    const [collections, setCollections] = useState<Collection[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

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
                <Message
                    message="Failed to load collections."
                    onRetry={fetchCollections}
                    btnText="Try again"
                />
            ) : isLoading ? (
                <div className="loading-spinner-container">
                    <Spinner />
                </div>
            ) : (
                <div className='dashboard'>
                    {currentUser.loggedIn && (
                        <h4 className="user-status">
                            Signed in as <span className="user-name">{currentUser.name}</span> (example user)
                        </h4>
                    )}

                    <div className='controls'>
                        <SearchBar setSearchValue={setSearchValue} />

                        <Button
                            variant='filter-btn'
                            icon={FaSliders}
                            onClick={() => setIsFilterModalOpen(true)}
                        />

                        <Button
                            variant='add-btn'
                            icon={PlusIcon}
                            text='Add collection'
                            onClick={() => setIsAddModalOpen(true)}
                        />
                    </div>

                    <Modal
                        isOpen={isFilterModalOpen}
                        escapeAction={() => setIsFilterModalOpen(false)}
                        modalTitle="Filters"
                    >
                        <FilterBar
                            filtersList={filtersList}
                            setFiltersList={setFiltersList}
                        />
                    </Modal>

                    <Modal
                        isOpen={isAddModalOpen}
                        escapeAction={() => setIsAddModalOpen(false)}
                        modalTitle="Add Collection"
                    >
                        Add Collection Form
                    </Modal>

                    <CollectionsView
                        searchValue={searchValue}
                        filtersList={filtersList}
                        collections={collections}
                    />
                </div>
            )}
        </>
    );
}