describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
            username: 'TestUser',
            name: 'Test User',
            password: 'salasana'
          }
      cy.request('POST', 'http://localhost:3001/api/users', user)

      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('TestUser')
            cy.get('#password').type('salasana')
            cy.get('#login').click()

            cy.contains('TestUser logged in')
        })
    
        it('fails with wrong credentials', function() {
          cy.get('#username').type('TestUser')
          cy.get('#password').type('wrong')
          cy.get('#login').click()

          cy.contains('wrong credentials')
        })
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'TestUser', password: 'salasana' })
      })
  
      it('A blog can be created', function() {
        cy.createBlog({
          title: 'test blog',
          author: 'test user',
          url: 'testblog.com'
        })
        cy.contains('test blog')
      })

      describe('and a blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'test blog',
            author: 'test user',
            url: 'testblog.com'
          })
        })
  
        it('it can be liked', function () {         
          cy.contains('test blog').parent().find('button').as('theButton')
          cy.get('@theButton').click()
          cy.contains('likes').parent().find('button').as('likeButton')
          cy.get('@likeButton').should('contain', 'like').click()
          cy.contains('New like was added!')
        })
        
        it('and it can be deleted', function () {         
          cy.contains('test blog').parent().find('button').as('theButton')
          cy.get('@theButton').click()
          cy.get('#deleteButton').click()
          
          cy.contains('Blog test blog was deleted')
        })
      })

      describe('blogs will be shown', function () {
        beforeEach(function () {
          cy.createBlog({ title: 'test blog', author: 'test user', url: 'testblog.com' })
          cy.createBlog({ title: 'another blog', author: 'another user', url: 'anotherblog.com' })
          cy.createBlog({ title: 'third blog', author: 'third user', url: 'thirdblog.com' })
        
          cy.contains('test blog').parent().as('testBlog')
          cy.contains('another blog').parent().as('anotherBlog')
          cy.contains('third blog').parent().as('thirdBlog')
        })

        it('and they will be sorted by the amount of likes', function () { 
          cy.get('@testBlog').contains('show').click()
          cy.get('@anotherBlog').contains('show').click()
          cy.get('@thirdBlog').contains('show').click()

          cy.get('@thirdBlog').contains('like').click()
          cy.wait(300)
          cy.get('@anotherBlog').contains('like').click()
          cy.wait(300)
          cy.get('@anotherBlog').contains('like').click()
          cy.wait(300)
          
          cy.get('#allBlogs').then(blog => {
            cy.wrap(blog[0]).contains('2')
            cy.wrap(blog[1]).contains('1')
            cy.wrap(blog[2]).contains('0')
          })
        })
      })
    })
})