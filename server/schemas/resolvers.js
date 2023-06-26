const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
          return User.find().populate('books');
        },
        user: async (parent, { username }) => {
          return User.findOne({ username }).populate('books');
        },
        books: async (parent, { username }) => {
          const params = username ? { username } : {};
          return Book.find(params).sort({ createdAt: -1 });
        },
        book: async (parent, { bookId }) => {
          return Book.findOne({ _id: bookId });
        },
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('books');
          }
          throw new AuthenticationError('You need to be logged in!');
        },
      },

      Mutation: {
        addUser: async (parent, { username, email, password }) => {
          console.log('addUser')
          const user = await User.create({ username, email, password });
          console.log('user')
          const token = signToken(user);
          console.log('token')
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('No user found with this email address');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
    
          return { token, user };
        },

    addBook: async(parent, { bookId } ) => {
        if (User) {

            const book = await bookSchema.findOne({bookId})

            await User.findOneAndUpdate(
                { username: bookId },
                { $addToSet: { books: book._id }}
                );
                return book;
        }
    },

    removeBook: async (parent, { bookId }) => {
        return Book.findOneAndDelete({ _id: bookId})
    }

    }

    }

    module.exports = resolvers;