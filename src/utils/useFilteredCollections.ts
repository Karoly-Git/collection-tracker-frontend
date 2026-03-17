import { useMemo } from "react";
import type { Collection } from "@/types/collection";

type Props = {
    collections: Collection[];
    searchValue: string;
    filtersList: string[];
};

export function useFilteredCollections({
    collections,
    searchValue,
    filtersList
}: Props) {

    return useMemo(() => {

        const today = new Date().toDateString();
        const search = searchValue.toLowerCase();

        return collections.filter((c) => {
            const matchesStatus = filtersList.includes(c.currentStatus);

            const matchesSearch =
                c.materialName.toLowerCase().includes(search) ||
                c.customerName.toLowerCase().includes(search) ||
                String(c.collectionRefNum).toLowerCase().includes(search);

            if (filtersList.includes("TODAY")) {

                const checkedDate =
                    new Date(c.checkedInAt).toDateString();

                const matchesToday = today === checkedDate;

                return matchesStatus &&
                    matchesSearch &&
                    matchesToday;
            }

            return matchesStatus && matchesSearch;
        });

    }, [collections, searchValue, filtersList]);
}