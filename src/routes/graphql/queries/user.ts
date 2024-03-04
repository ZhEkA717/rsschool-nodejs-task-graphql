import { GraphQLNonNull } from 'graphql';
import { UserListType, UserType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';
import { TypePrisma } from '../types/index.js';
import { UUID } from 'crypto';
import { User } from '@prisma/client';

const user = {
  type: UserType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_: unknown, { id }: User, { prisma }: TypePrisma) =>
    await prisma.user.findUnique({
      where: { id: id as UUID },
    }),
};

const users = {
  type: UserListType,
  resolve: async (_: unknown, __: unknown, { prisma }: TypePrisma) =>
    await prisma.user.findMany(),
};

export const userQuery = { user, users };
