const { User } = require('../models');
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
    Query: {
    },
    Mutation: {
        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);

            if (!user) {
                throw new AuthenticationError('Something went wrong!');
            }

            const token = signToken(user);
            return { token, user };
        }
    },
};

module.exports = resolvers;