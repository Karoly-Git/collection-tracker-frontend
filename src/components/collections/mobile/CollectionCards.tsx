import "./CollectionCards.scss";

import type { Collection } from "@/types/collection";

import CollectionCard from "./CollectionCard";
import Message from "@/components/ui/message/Message";

type CollectionCardsProps = {
    collections: Collection[];
    setIsInfoModalOpen: (value: boolean) => void;
    setIsDeleteModalOpen: (value: boolean) => void;
};

export default function CollectionCards({ collections, setIsInfoModalOpen, setIsDeleteModalOpen }: CollectionCardsProps) {

    return (
        <>
            {!collections.length ? (
                <Message
                    title="No collections match your current search or filter"
                    message="Try adjusting the filters or clearing the search."
                />) : (
                <div className="collection-cards">
                    {collections.map(collection => (
                        <CollectionCard
                            key={collection.id}
                            collection={collection}
                            setIsInfoModalOpen={setIsInfoModalOpen}
                            setIsDeleteModalOpen={setIsDeleteModalOpen}
                        />
                    ))}
                </div>
            )}
        </>
    );
}