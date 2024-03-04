import { GraphQLObjectType } from "graphql";
import { userQuery } from "./user.js";
import { memberTypeQuery } from "./member.js";
import { postQuery } from "./post.js";
import { profileQuery } from "./profile.js";

export const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        ...userQuery,
        ...memberTypeQuery,
        ...postQuery,
        ...profileQuery
    }),
});