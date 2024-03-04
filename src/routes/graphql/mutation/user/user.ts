import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "../../types/user.js";
import { TypePrisma } from "../../types/index.js";
import { CreateUserInputType, DeleteUserInputType, UpdateUserInputType, UserSubscriptionType } from "./user.type.js";
import { UUIDType } from "../../types/uuid.js";

const userInputFields = {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
}

const userInput = new GraphQLInputObjectType({
    name: 'userInput',
    fields: () => userInputFields
})

const createUser = {
    type: UserType as GraphQLObjectType,
    args: { dto: { type: new GraphQLNonNull(userInput) } },
    resolve: async (_: unknown, { dto }: CreateUserInputType, { prisma }: TypePrisma) =>
      await prisma.user.create({ data: dto }),
};

const updateUser = {
    type: UserType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: userInput },
    },
    resolve: async (
      _: unknown,
      { id, dto }: UpdateUserInputType,
      { prisma }: TypePrisma,
    ) => await prisma.user.update({ where: { id }, data: dto }),
};

const deleteUser = {
    type: UUIDType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_: unknown, { id }: DeleteUserInputType, { prisma }: TypePrisma) => {
      await prisma.user.delete({ where: { id } });
      return true;
    }
};

const subscribeTo = {
    type: UserType as GraphQLObjectType,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      _: unknown,
      { userId, authorId }: UserSubscriptionType,
      { prisma }: TypePrisma,
    ) =>
    await prisma.user.update({
        where: { id: userId },
        data: { userSubscribedTo: { create: { authorId } } },
    }),
};

const subscribeFrom = {
    type: UUIDType,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      _: unknown,
      { userId, authorId }: UserSubscriptionType,
      { prisma }: TypePrisma,
    ) => {
      await prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: userId,
            authorId,
          },
        },
      });
      return userId;
    },
};

export const userMutation = {
    createUser,
    updateUser,
    deleteUser,
    subscribeTo,
    subscribeFrom,
}