export type Comment = {
    userId: string;
    text: string;
    timestamp: string;
};

export type StatusHistoryItem = {
    status: string;
    timestamp: string,
    updatedByUserId: string,
    comments: Comment[]
};

export type Collection = {
    id: string;
    materialName: string;
    customerName: string;
    collectionRefNum: string;
    lorryRegNum: string;
    checkedInAt: string;
    startedLoadingAt: string | null;
    finishedLoadingAt: string | null;
    checkedOutAt: string | null;
    currentStatus: string;
    statusHistory: StatusHistoryItem[] | [];
};

