import { uuid } from "uuidv4";
import { data, params } from "@serverless/cloud";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const createUser = async ( parent, args ) => {
	const id = uuid();
	const password = args.password;
	const cryptoPass = await bcrypt.hash( password, 10 );
	await data.set( `users:${ args.username }`, {
		id, username: args.username, email: args.email, password: cryptoPass,
	} );
	return data.get( `users:${ args.username }` );
}

export const updateUser = async ( parent, args ) => {
	const password = args.password;
	const cryptoPass = await bcrypt.hash( password, 10 );
	await data.set( `users:${ args.id }`, {
		id: args.id, username: args.username, email: args.email, password: cryptoPass,
	} );
	return data.get( `users:${ args.id }` );
}

export const deleteUser = async ( parent, args ) => {
	await data.remove( `users:${ args.id }` );
	return `user:${ args.id } deleted`;
}

export const loginUser = async ( parent, args ) => {
	const { username, password } = args;
	if ( !username || !password ) {
		throw new Error( 'Email and password are required' );
	}
	const user = await data.get( `users:${ username }` );
	if ( !user ) {
		throw new Error( 'User not found' );
	}
	const isCorrectPassword = bcrypt.compareSync( password, user.password );
	if ( !isCorrectPassword ) {
		throw new Error( 'Incorrect password' );
	}
	const token = jwt.sign( { id: user.id, username: user.username }, params.JWT_SECRET );
	return { token };
}
