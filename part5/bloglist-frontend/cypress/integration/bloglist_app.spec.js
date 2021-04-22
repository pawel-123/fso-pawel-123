describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      username: 'pawel_admin',
      name: 'Pawel Cebula',
      password: 'password123'
    })
    // const user = {
    //   username: 'pawel_admin',
    //   name: 'Pawel Cebula',
    //   password: 'password123'
    // }
    // cy.request('POST', 'http://localhost:3003/api/users', user)
    // const blog = {
    //   title: 'First blog post',
    //   author: 'John Snow',
    //   url: 'http://fakeurl.com/blog/1',
    //   likes: 7
    // }
    // cy.request('POST', 'http://localhost:3003/api/blogs', blog)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('pawel_admin')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()

      cy.contains('successfully logged in')
      cy.contains('Pawel Cebula logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('pawel_admin')
      cy.get('#password').type('wrongpass123')
      cy.get('#login-button').click()

      cy.contains('Pawel Cebula logged in').should('not.exist')
      cy.get('.error')
        .should('contain', 'wrong credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'pawel_admin', password: 'password123' })
    })

    it('A blog can be created', function () {
      cy.contains('show new blog form').click()
      cy.get('#title').type('First blog post')
      cy.get('#author').type('Jane Doe')
      cy.get('#url').type('http://anotherurl.com/blog/44')
      cy.contains('Add blog').click()

      cy.contains('First blog post - Jane Doe')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Second blog post',
          author: 'John Smith',
          url: 'http://john.com/blog/12',
          likes: '17'
        })
        cy.createBlog({
          title: 'Third blog post',
          author: 'Justin',
          url: 'http://justin.com/blog/14',
          likes: '44'
        })
        cy.createBlog({
          title: 'Fourth blog post',
          author: 'Jamie',
          url: 'http://jamie.com/blog/11',
          likes: '11'
        })
      })

      it('A user can like a blog', function () {
        cy.contains('Third blog post').contains('show details').click()
        cy.contains('Third blog post').find('.like-button').click()
        cy.contains('Third blog post').find('.likes-number').contains('45')
      })

      it('A user who created a blog can delete it', function () {
        cy.contains('Third blog post').contains('show details').click()
        cy.contains('Third blog post').find('.delete-button').click()
        cy.contains('Third blog post').should('not.exist')
      })

      it('A user cannot delete a blog created by another user', function () {
        cy.createUser({
          username: 'second_user',
          name: 'Jamie Jones',
          password: 'password123'
        })
        cy.login({ username: 'second_user', password: 'password123' })

        cy.contains('Third blog post').contains('show details').click()
        cy.contains('Third blog post').find('.delete-button').should('not.exist')
      })

      it('Blogs are ordered according to number of likes, from high to lowest', function () {
        cy.get('.blog-post').should('have.length', 3)
        cy.contains('Second blog post').contains('show details').click()
        cy.contains('Third blog post').contains('show details').click()
        cy.contains('Fourth blog post').contains('show details').click()

        cy.get('.likes-number').should('have.length', 3)

        cy.get('.likes-number').then(likes => {
          const likesNumbers = likes.map((index, like) => {
            return Number(like.textContent)
          }).toArray()

          expect(likesNumbers).to.deep.equal([44, 17, 11])
        })
      })
    })
  })
})