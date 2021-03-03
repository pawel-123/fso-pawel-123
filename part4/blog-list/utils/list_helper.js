const array = require('lodash/array')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    return blogs.length === 0
        ? {}
        : {
            title: sortedBlogs[0].title,
            author: sortedBlogs[0].author,
            likes: sortedBlogs[0].likes
        }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const blogAuthors = blogs.map(blog => blog.author)
    const uniqueAuthors = blogAuthors.reduce((array, author) => {
        return array.includes(author)
            ? array
            : array.concat(author)
    }, [])

    const authorBlogs = blogAuthors.reduce((obj, author) => {
        if (!obj[author]) {
            obj[author] = 1
        } else {
            obj[author] += 1
        }

        return obj
    }, {})

    const sortedAuthorBlogs = Object.entries(authorBlogs).sort((a, b) => b[1] - a[1])

    return {
        author: sortedAuthorBlogs[0][0],
        blogs: sortedAuthorBlogs[0][1]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const authorLikes = blogs.reduce((obj, blog) => {
        if (!obj[blog.author]) {
            obj[blog.author] = blog.likes
        } else {
            obj[blog.author] += blog.likes
        }

        return obj
    }, {})

    const sortedAuthorLikes = Object.entries(authorLikes).sort((a, b) => b[1] - a[1])

    const result = {
        author: sortedAuthorLikes[0][0],
        likes: sortedAuthorLikes[0][1]
    }

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}