import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers.js";
import { api, http, params } from "@serverless/cloud";
import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";

http.on( 404, "index.html" );

class ServerlessCloudApollo extends ApolloServer {
	serverlessFramework() {
		return true;
	}
	
	async ensureStarted() {
		await super.ensureStarted();
	}
}

const server = new ServerlessCloudApollo( {
	typeDefs, resolvers, context: async ( { req } ) => {
		const token = req.headers.authorization || "";
		const user = jwt.verify( token, params.JWT_SECRET, { ignoreExpiration: true }, ( err, decoded ) => {
			if ( err ) {
				return null;
			}
			return decoded;
		} );
		return ( { user } );
	}
} );
server.ensureStarted().then( () => {
	api.use( server.getMiddleware( { path: '/graphql' } ) );
	console.log( `Serverless front is available on  ${ params.CLOUD_URL }` );
	console.log( `Serverless Cloud Apollo sandbox is available on  ${ params.CLOUD_URL }/graphql` );
} );

