import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberTypeId } from "../types/members.js";
import { ProfileType } from "../types/profile.js";
import { TypePrisma } from "../types/index.js";
import { UUIDType } from "../types/uuid.js";
import { CreateProfileInputType, DeleteProfileInputType, UpdateProfileInputType } from "./input/profile.input.js";

const profileInputFields = {
  isMale: { type: GraphQLBoolean },
  yearOfBirth: { type: GraphQLInt },
  memberTypeId: { type: MemberTypeId },
  userId: { type: UUIDType },  
}

const createProfileInput = new GraphQLInputObjectType ({
    name: 'profileInput',
    fields: () => profileInputFields,
})

const updateProfileInput = new GraphQLInputObjectType ({
    name: 'updateProfileInput',
    fields: () => {
      const { isMale, yearOfBirth, memberTypeId } = {...profileInputFields};
      return { isMale, yearOfBirth, memberTypeId };
    }
})

const createProfile = {
    type: ProfileType,
    args: { dto: { type: createProfileInput } },
    resolve: async (_: unknown, { dto }: CreateProfileInputType, { prisma }: TypePrisma) => {
      return await prisma.profile.create({ data: dto });
    },
};

const updateProfile = {
    type: ProfileType,
    args: { dto: { type: updateProfileInput }, id: { type: UUIDType } },
    resolve: async (_: unknown, { dto, id }: UpdateProfileInputType, { prisma }: TypePrisma) => {
      return await prisma.profile.update({
        where: { id },
        data: dto,
      });
    },
};

const deleteProfile = {
    type: GraphQLBoolean,
    args: { id: { type: UUIDType } },
    resolve: async (_, { id }: DeleteProfileInputType, { prisma }: TypePrisma) => {
      await prisma.profile.delete({ where: { id }});
      return true;
    },
};

export const profileMutation = {
  createProfile,
  updateProfile,
  deleteProfile
}