import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { ProfileListType } from './profile.js';
import { TypePrisma } from './index.js';
import { MemberType as MemberTypePrisma } from '@prisma/client';

enum MemberTypeIDEnum {
    Basic = 'basic',
    Business = 'business'
} 

export const MemberTypeId: GraphQLEnumType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: MemberTypeIDEnum.Basic },
    business: { value: MemberTypeIDEnum.Business },
  },
});

export const MemberType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },

    profiles: {
      type: ProfileListType,
      resolve: async ({ id }: MemberTypePrisma, _args: unknown, { prisma }: TypePrisma) =>
        await prisma.profile.findMany({ where: { memberTypeId: id as string } }),
    },
  }),
});

export const MemberListType = new GraphQLList(MemberType);
