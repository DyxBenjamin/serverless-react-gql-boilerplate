export const userType = `
    type User {
        username: String!
        password: String!
        email: String
        id: ID!
    }
`

export const userQuery = `
	me: User
	listUsers: [User]
	getUser(id: String!): User
`

export const userMutation = `
	createUser(username: String!, password: String!, email: String): User
	updateUser(id: String!, username: String, password: String, email: String): User
	deleteUser(id: String!): String
	loginUser(username: String!, password: String!): Token
`
