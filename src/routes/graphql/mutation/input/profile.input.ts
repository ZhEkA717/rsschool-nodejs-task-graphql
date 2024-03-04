type dtoType = {
    isMale: boolean;
    yearOfBirth: number;
    memberTypeId: string;
    userId: string;
};

export type CreateProfileInputType = {
    dto: dtoType
}

export type UpdateProfileInputType = {
    id: string;
    dto: Omit<dtoType, 'userId'>;
  };

export type DeleteProfileInputType = {
    id: string
}