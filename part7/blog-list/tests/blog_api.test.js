const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Why am I starting this blog?",
        author: "Karl Pilkington",
        url: "http://www.karl.com/blog/1",
        likes: 6
    },
    {
        title: "Welcome to my first blog post",
        author: "John Snow",
        url: "http://www.johnsnow.com/blog/1",
        likes: 14
    }
]

describe('when there is initially some blogs saved and one user', () => {
    beforeAll(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password123', 10)
        const user = new User({
            username: 'root',
            name: 'First User',
            passwordHash
        })

        await user.save()
    })

    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(2)
    })

    test('id property is defined', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    test('a valid blog can be added', async () => {
        const user = await helper.usersInDb('root')

        const userForToken = {
            username: user[0].username,
            id: user[0].id
        }

        const token = jwt.sign(userForToken, config.SECRET)

        const newBlog = {
            title: "Testing adding another blog post with token",
            author: "Token Smith",
            url: "http://www.fakeurl.com/blog/3/token",
            likes: 555,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body.length).toBe(initialBlogs.length + 1)

        const titles = blogsAtEnd.body.map(blog => blog.title)
        expect(titles[initialBlogs.length]).toContain("Testing adding another blog post")
    })

    test('likes defaults to 0 if not specified in request', async () => {
        const user = await helper.usersInDb('root')

        const userForToken = {
            username: user[0].username,
            id: user[0].id
        }

        const token = jwt.sign(userForToken, config.SECRET)

        const blogWithoutLikes = {
            title: "Testing blog without likes",
            author: "John Doe",
            url: "http://nolikes.com/123"
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blogWithoutLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body.length).toBe(initialBlogs.length + 1)

        const lastBlog = blogsAtEnd.body[blogsAtEnd.body.length - 1]
        expect(lastBlog.likes).toBe(0)
    })

    test('responds with 401 if token is not provided', async () => {
        const newBlog = {
            title: "Testing adding another a blog post without a token",
            author: "No Token",
            url: "http://www.fakeurl.com/blog/3/no-token",
            likes: 888,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })

    test('responds with 400 if title and/or url missing', async () => {
        const blogWithoutTitle = {
            author: "John Doe",
            url: "http://urlurl.com/123",
            likes: 4
        }

        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400)
    })

    test('deletes the blog correctly', async () => {
        const user = await helper.usersInDb('root')

        const userForToken = {
            username: user[0].username,
            id: user[0].id
        }

        const token = jwt.sign(userForToken, config.SECRET)

        const blogs = await api.get('/api/blogs')
        const blogToDelete = blogs.body[0]

        await Blog.findByIdAndUpdate(blogToDelete.id, { user: user[0].id })

        await api
            .delete(`/api/blogs/${blogToDelete.id.toString()}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const updatedBlogs = await api.get('/api/blogs')
        expect(updatedBlogs.body.length).toBe(initialBlogs.length - 1)

        const blogIds = updatedBlogs.body.map(blog => blog.id.toString())
        expect(blogIds).not.toContain(blogToDelete.id.toString())
    })

    test('edits the number of likes in a blog correctly', async () => {
        const blogs = await api.get('/api/blogs')
        const blogToEdit = blogs.body[0]

        const blog = {
            likes: 888
        }

        await api
            .put(`/api/blogs/${blogToEdit.id.toString()}`)
            .send(blog)
            .expect(200)

        const updatedBlog = await api.get(`/api/blogs/${blogToEdit.id.toString()}`)
        expect(updatedBlog.body.likes).toBe(888)
    })
})

describe('when there is initially one user in database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password123', 10)
        const user = new User({
            username: 'root',
            name: 'First User',
            passwordHash
        })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'hithere',
            name: 'Second User',
            password: 'correctpass123'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    })

    test('creation fails with an existing username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Second User',
            password: 'goodpass123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails without or without a valid password', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'uniqueUserName',
            name: 'Second User',
            password: 'aa'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('at least three characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

