// types/lorry.ts
export interface Comment {
    id: string;
    userId: string;
    text: string;
    timestamp: string;
}

export interface StatusHistoryItem {
    status: string;
    timestamp: string;
    updatedBy: {
        userId: string;
    };
    comments: Comment[];
}

export interface Lorry {
    lorryId: string;
    regNum: string;
    materialName: string;
    customerName: string;
    collectionRefNum: string;
    checkedInAt: string;
    checkedOutAt: string | null;
    currentStatus: string;
    statusHistory: StatusHistoryItem[];
}
