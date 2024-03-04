import { GraphQLObjectType } from "graphql";
import { userQuery } from "../queries/user.js";
import { memberTypeQuery } from "../queries/member.js";
import { postQuery } from "../queries/post.js";
import { profileQuery } from "../queries/profile.js";

export const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        ...userQuery,
        ...memberTypeQuery,
        ...postQuery,
        ...profileQuery
    }),
});