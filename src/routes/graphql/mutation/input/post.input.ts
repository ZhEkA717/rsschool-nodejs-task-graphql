type dtoType = {
    title: string;
    content: string;
    authorId: string;
}
export type CreatePostInputType = {
    dto: dtoType
}

export type UpdatePostInputType = {
    id: string,
    dto: Omit<dtoType, 'authorId'>;
}

export type DeletePostInputType = {
    id: string,
}
