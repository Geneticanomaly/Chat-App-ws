export type Chat = {
    id: number;
    createdAt: string;
    updatedAt: string;
    user: User;
};

export type User = {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    chats?: Chat[];
};
