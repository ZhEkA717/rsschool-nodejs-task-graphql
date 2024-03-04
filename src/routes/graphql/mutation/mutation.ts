import { GraphQLObjectType } from "graphql";
import { userMutation } from "./user/user.js";
import { PostMutation } from "./post/post.js";
import { profileMutation } from "./profile/profile.js";

export const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
    ...userMutation,
    ...PostMutation,
    ...profileMutation,
    })
});