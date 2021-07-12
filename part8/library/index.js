require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server')
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
    // allBooks: (root, args) => {
    //   if (!args.author & !args.genre) {
    //     return books
    //   }

    //   const byAuthor = book => book.author === args.author
    //   const byGenre = book => book.genres.includes(args.genre)

    //   return args.author
    //     ? args.genre
    //       ? books.filter(byAuthor).filter(byGenre)
    //       : books.filter(byAuthor)
    //     : books.filter(byGenre)
    // },
    allBooks: () => Book.find({}),
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => books.filter(book => book.author === root.name).length
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      })

      await book.save()

      return await Book.findById(book._id).populate('author')
    },
    editAuthor: (root, args) => {
      const authorToEdit = authors.find(author => author.name === args.name)

      if (authorToEdit && args.setBornTo) {
        const editedAuthor = { ...authorToEdit, born: args.setBornTo }
        authors = authors.map(author => author.name === args.name ? editedAuthor : author)
        return editedAuthor
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