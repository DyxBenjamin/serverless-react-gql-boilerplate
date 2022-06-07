import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, HttpLink, gql, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient( {
	cache: new InMemoryCache(), link: new HttpLink( {
		uri: "https://super-deploy-iuxxj.cloud.serverless.com/graphql"
	} ),
} );

ReactDOM.render(
	<React.StrictMode >
		
		<ApolloProvider client = { client } >
			<App />
		</ApolloProvider >
		
	</React.StrictMode >,
	
	document.getElementById( 'root' ) );

reportWebVitals();
