import { useState } from "react";
import "./App.css";
import { gql, useMutation } from "@apollo/client";

const Loading = () => ( <div >
	<p >Loading Users...</p >
</div > );

const Home = () => (
	<div >
	<h1 >Home</h1 >
	<p >Welcome to the home page</p >
	</div > );

const App = () => {
	const [ loader, setLoader ] = useState( false );
	const [ token, setToken ] = useState('');
	const [loginUser] = useMutation( gql`
		mutation LoginUser($username: String!, $password: String!) {
  			loginUser(username: $username, password: $password) {
    			token
  			}
		}
		`);
	
	async function login(event) {
		event.preventDefault();
		const { username, password } = document.forms[0];

		setLoader( true );
		loginUser( { variables: { username: username.value, password: password.value } } ).then(
			( data ) => {
				setToken( data.data.loginUser.token );
				setLoader( false );
			}
		);
	}
	
	if ( !token ){
		return(
			<div
				className = 'App'
				style = { {
					display: "flex",
					alignItems: "center",
					textAlign: "center",
					flexDirection: "column",
					height: "100vh",
				} }
			>
				<h1 >Study cards</h1 >
				
				<form onSubmit = { login } >
					<label >Username:</label > <input type = 'text'  name = 'username' /> <label >Password:</label > <input type = 'password' name = 'password' /> <input type = 'submit' value = 'Login' />
				</form >
			
			</div >
		);
	}
	
	if ( loader ) {
		return <Loading />;
	}
	
	return (<Home />);
};

export default App;
