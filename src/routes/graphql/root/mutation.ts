import { GraphQLObjectType } from "graphql";
import { userMutation } from "../mutation/user.js";
import { postMutation } from "../mutation/post.js";
import { profileMutation } from "../mutation/profile.js";

export const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
    ...userMutation,
    ...postMutation,
    ...profileMutation,
    })
});