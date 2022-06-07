import { data } from "@serverless/cloud";

export const me = async (parent, arg, context) => {
	const { user } = context;
  	if (!user) {
		throw new Error("You must be logged in to do that!");
  	}
	console.log("user", user);
	return await data.get( `users:${user.username}` );
};

export const getUser = ( parent, args ) => {
	return data.get( `users:${ args.username }` );
}

export const listUsers = async () => {
	const users = await data.get( "users:*" );
	return users.items.map( user => user.value );
}
