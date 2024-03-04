import { GraphQLNonNull } from 'graphql';
import { PostListType, PostType } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';
import { TypePrisma } from '../types/index.js';
import { UUID } from 'crypto';
import { Post } from '@prisma/client';

const post = {
  type: PostType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_: unknown, { id }: Post, { prisma }: TypePrisma) =>
    await prisma.post.findUnique({ where: { id: id as UUID } }),
};

const posts = {
  type: PostListType,
  resolve: async (_: unknown, __: unknown, { prisma }: TypePrisma) =>
    await prisma.post.findMany(),
};

export const postQuery = { post, posts };