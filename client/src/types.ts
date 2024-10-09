export type Chat = {
    id: number;
    createdAt: string;
    updatedAt: string;
    user: User;
};

export type User = {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    chats?: Chat[];
};

export type UserContextValueType = {
    token: string;
    user: User;
};

// export type UserContextType = {
//     user: User
// }

export type MessageType = {
    id?: number;
    chatId: number;
    senderId: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
};

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type MessageWithoutId = UnionOmit<MessageType, 'id'>;

export type SentMessage = {
    chatId: number;
    senderId: string;
    message: string;
};
