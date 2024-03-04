import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { UUID } from 'crypto';
import { TypePrisma } from './index.js';
import { Post } from '@prisma/client';

export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserType,
      resolve: async ({ authorId }: Post, _args: unknown, { prisma }: TypePrisma) =>
        await prisma.user.findUnique({ where: { id: authorId as UUID } }),
    },
  }),
});

export const PostListType = new GraphQLList(PostType);