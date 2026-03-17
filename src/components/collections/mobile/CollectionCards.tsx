import "./CollectionCards.scss";

import type { Collection } from "@/types/collection";

import CollectionCard from "./CollectionCard";
import Message from "@/components/ui/message/Message";

type CollectionCardsProps = {
    collections: Collection[];
};

export default function CollectionCards({ collections }: CollectionCardsProps) {

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
                        />
                    ))}
                </div>
            )}
        </>
    );
}