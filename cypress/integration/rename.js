const repos = require('../../repos.json')

describe('rename all the things', () => {
  beforeEach(() => {
    // Preserve every cookie in every test
    Cypress.Cookies.defaults({
      preserve: () => true,
    })
  })

  it('should login', () => {
    cy.visit('https://github.com/login')
    cy.location('pathname').then(pathname => {
      if (pathname.includes('login')) {
        cy.pause()
        // this will give you a chance to login and get all the right cookies set
      } else {
        // you're already logged in... continue
      }
    })
  })

  for (const repo of repos) {
    it(`should rename ${repo}`, () => {
      cy.visit(`${repo}/branches`)
      cy.findByRole('button', {name: /rename default branch/i}).then(button => {
        if (button[0].getAttribute('title').includes('main')) return

        cy.findByRole('button', {name: /rename default branch master/i}).click()
        cy.findByRole('dialog', {name: /rename default branch/i}).within(() => {
          cy.findByLabelText(/rename master to/i)
            .clear()
            .type('main')
          cy.findByRole('button', {name: /rename branch/i}).click()
        })
      })
    })
  }
})
