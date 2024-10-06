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
