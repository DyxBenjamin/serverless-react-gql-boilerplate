import { createUser, deleteUser, loginUser, updateUser } from "./users/userMutations.js";
import { getUser, listUsers, me } from "./users/userQueries.js";

export const resolvers = {
	Query: {
		getUser,
		listUsers,
		me
	},
	
	Mutation: {
		createUser,
		updateUser,
		deleteUser,
		loginUser,
	},
	
};

