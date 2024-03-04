type dtoType = {
    name: string,
    balance: number,
}
export type CreateUserInputType = {
    dto: dtoType
}

export type UpdateUserInputType = {
    id: string,
    dto: dtoType
}

export type DeleteUserInputType = {
    id: string,
}

export type UserSubscriptionType = {
    userId: string;
    authorId: string;
}