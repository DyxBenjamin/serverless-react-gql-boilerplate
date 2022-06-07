import { gql } from "apollo-server-express";
import { userMutation, userQuery, userType } from "./users/userTypeDef.js";

export const typeDefs = gql`
	${userType}
	
	type Token {
		token: String!
	}
    
    type Query {
        ${userQuery}
    }

    type Mutation {
        ${userMutation}
    }
`;

