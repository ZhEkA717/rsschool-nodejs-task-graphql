import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { CreatePostInputType, DeletePostInputType, UpdatePostInputType } from "./input/post.input.js";
import { TypePrisma } from "../types/index.js";
import { PostType } from "../types/post.js";

const postInputFields = {
    authorId: { type: UUIDType },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  };

const postInput = new GraphQLInputObjectType({
  name: 'postInput',
  fields: () => postInputFields,
});

const createPost = {
    type: PostType as GraphQLObjectType,
    args: { dto: { type: new GraphQLNonNull(postInput) } },
    resolve: async (_: unknown, { dto }: CreatePostInputType, { prisma }: TypePrisma) =>
      await prisma.post.create({ data: dto }),
};

const updatePost = {
    type: PostType as GraphQLObjectType,
    args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type: postInput } },
    resolve: async (
      _: unknown,
      { id, dto }: UpdatePostInputType,
      { prisma }: TypePrisma,
    ) => await prisma.post.update({ where: { id }, data: dto }),
};

const deletePost = {
    type: UUIDType,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: async (_: unknown, { id }: DeletePostInputType, { prisma }: TypePrisma) => {
      await prisma.post.delete({ where: { id } });
      return true;
    },
};
  
export const postMutation = {
  createPost,
  updatePost,
  deletePost,
};