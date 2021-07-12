require('dotenv').config();
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => { console.log('connected to MongoDB')})
  .catch((error) => { console.log('error connecting to MongoDB', error.message)})

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      
      if (!args.author && !args.genre) {
        return books
      }

      const byAuthor = book => book.author.name === args.author
      const byGenre = book => book.genres.includes(args.genre)

      const filteredBooks = args.author
          ? args.genre
            ? books.filter(byAuthor).filter(byGenre)
            : books.filter(byAuthor)
          : books.filter(byGenre)

      return filteredBooks
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => Book.count({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      
      await book.populate('author').execPopulate()

      return book
    },
    editAuthor: async (root, args) => {
      const authorToEdit = await Author.findOne({ name: args.name })

      if (authorToEdit && args.setBornTo) {
        authorToEdit.born = args.setBornTo
        return authorToEdit.save()
      }

      return null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})