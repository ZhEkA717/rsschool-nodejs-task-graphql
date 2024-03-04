import { GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { UUID } from 'crypto';
import { TypePrisma } from './index.js';
import { MemberType, MemberTypeId } from './members.js';
import { Profile } from '@prisma/client';

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLFloat },

    user: {
      type: UserType,
      resolve: async ({ id }: Profile, _args: unknown, { prisma }: TypePrisma) =>
        await prisma.user.findUnique({ where: { id: id as UUID } }),
    },

    userId: { type: UUIDType },

    memberType: {
      type: MemberType,
      resolve: async (
        { memberTypeId }: Profile,
        _args: unknown,
        { prisma }: TypePrisma,
      ) => await prisma.memberType.findUnique({ where: { id: memberTypeId as string } }),
    },

    memberTypeId: { type: MemberTypeId },
  }),
});

export const ProfileListType = new GraphQLList(ProfileType);