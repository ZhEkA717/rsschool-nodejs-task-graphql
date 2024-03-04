import { TypePrisma } from '../types/index.js';
import { MemberListType, MemberType, MemberTypeId } from '../types/members.js';
import { MemberType as MemberTypePrisma } from '@prisma/client';

const memberType = {
  type: MemberType,
  args: { id: { type: MemberTypeId } },
  resolve: async (_: unknown, { id }: MemberTypePrisma, { prisma }: TypePrisma) =>
    await prisma.memberType.findUnique({ where: { id: id as string } }),
};

const memberTypes = {
  type: MemberListType,
  resolve: async (_: unknown, __: unknown, { prisma }: TypePrisma) =>
    await prisma.memberType.findMany(),
};

export const memberTypeQuery = { memberType, memberTypes };