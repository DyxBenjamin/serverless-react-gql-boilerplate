import { createUser, deleteUser, loginUser, updateUser } from "./users/userMutations.js";
import { getUser, listUsers, me } from "./users/userQueries.js";
import { getCard, getCards, getDeck, getDecksByUser, listDecks } from "./cards/cardQueries.js";
import { createCard, createDeck, deleteCard, deleteDeck, updateCard, updateDeck } from "./cards/cardMutations.js";

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

