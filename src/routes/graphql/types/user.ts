import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostListType } from './post.js';

import { UUID } from 'crypto';
import { TypePrisma } from './index.js';
import { User } from '@prisma/client';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }: User, _args: unknown, { prisma }: TypePrisma) =>
        await prisma.profile.findUnique({ where: { userId: id as UUID } }),
    },

    posts: {
      type: PostListType,
      resolve: async ({ id }: User, _args: unknown, { prisma }: TypePrisma) =>
        await prisma.post.findMany({ where: { authorId: id as UUID } }),
    },

    userSubscribedTo: {
      type: UserListType,
      resolve: async ({ id }: User, _args: unknown, { prisma }: TypePrisma) => {
        const subscribers = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: id as UUID },
          select: { author: true },
        });
        return subscribers.map((res) => res.author);
      },
    },

    subscribedToUser: {
      type: UserListType,
      resolve: async ({ id }: User, _args: unknown, { prisma }: TypePrisma) => {
        const subscribers = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: id as UUID },
          select: { subscriber: true },
        });
        return subscribers.map((res) => res.subscriber);
      },
    },
  }),
});

export const UserListType = new GraphQLList(UserType);
