import { useFilteredCollections } from "@/utils/useFilteredCollections";
import Table from "./desktop/Table";
import CollectionCards from "./mobile/CollectionCards";


import type { Collection } from "@/types/collection";

import { useEffect, useState } from "react";

type CollectionsViewProps = {
    collections: Collection[];
    searchValue: string;
    filtersList: string[];
    setIsInfoModalOpen: (value: boolean) => void;
    setIsDeleteModalOpen: (value: boolean) => void;
};

export default function CollectionsView({
    collections,
    searchValue,
    filtersList,
    setIsInfoModalOpen,
    setIsDeleteModalOpen
}: CollectionsViewProps) {

    const filteredCollections = useFilteredCollections({
        collections,
        searchValue,
        filtersList
    });

    const [isMobile, setIsMobile] = useState(
        window.innerWidth < 1000
    );

    useEffect(() => {

        const handleResize = () =>
            setIsMobile(window.innerWidth < 1000);

        window.addEventListener("resize", handleResize);

        return () =>
            window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) {
        return (
            <CollectionCards
                collections={filteredCollections}
                setIsInfoModalOpen={setIsInfoModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
        );
    }

    return (
        <Table
            collections={filteredCollections}
            setIsInfoModalOpen={setIsInfoModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
    );
}