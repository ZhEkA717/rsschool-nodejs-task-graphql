import { GraphQLNonNull } from 'graphql';
import { ProfileListType, ProfileType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';
import { TypePrisma } from '../types/index.js';
import { UUID } from 'crypto';
import { Profile } from '@prisma/client';

const profile = {
  type: ProfileType,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_: unknown, { id }: Profile, { prisma }: TypePrisma) =>
    await prisma.profile.findUnique({
      where: { id: id as UUID },
    }),
};

const profiles = {
  type: ProfileListType,
  resolve: async (_: unknown, __: unknown, { prisma }: TypePrisma) =>
    await prisma.profile.findMany(),
};

export const profileQuery = { profile, profiles };