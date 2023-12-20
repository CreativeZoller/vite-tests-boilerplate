/// <reference types="cypress" />
/*eslint no-undef: "error"*/
/*eslint-env browser*/

describe('Vite project default template app', () => {
  beforeEach(() => {
    // Cypress visits the default url for this app
    cy.visit('http://localhost:5173/')
  })

  it('displays a div with `root` id by default and a paragraph inside', () => {
    cy.get('#root').should('have.length', 1)
    // We check if a paragraph is already existing with the exact text we provide here
    cy.get('.read-the-docs').should('have.text', 'Click on the Vite and React logos to learn more')
  })

  // We should see two anchor tags with images inside
  it('anchor elements are represented', () => {
    cy.get('#root').find('._home_12nuw_1>div>a').first().find('img').as('viteCta')
    cy.get('#root').find('._home_12nuw_1>div>a').first().next().find('img').as('reactCta')
    cy.get('@viteCta').should('have.attr', 'alt')
    cy.get('@reactCta').should('have.attr', 'alt')
  })

  // We check if CTA is existing with specific test and clickable
  it('button element is referenced and check its texting a clickability', () => {
    cy.get('#root').find('._home_12nuw_1>button').as('cta')
    cy.get('@cta').should('have.text', 'About')
    cy.get('@cta').click()
  })

  // We navigate back just to navigate again
  it('should navigate back and forth once', () => {
    cy.go('back')
    cy.location('pathname').should('not.include', 'about')
  })

  // We navigate to the About page
  it('should navigate to the About page', () => {
    cy.get('#root').find('._home_12nuw_1>button').as('cta')
    cy.get('@cta').click()
    cy.location('pathname').should('include', '/about')
  })

  // We should have a proper title
  it('should display Headline1 tag with the proper title: About page', () => {
    cy.get('#root').find('._home_12nuw_1>button').as('cta')
    cy.get('@cta').click()
    cy.get('#root').find('h1').as('title')
    cy.get('@title').should('have.text', 'About page')
  })

  // We should have a proper subtitle with a string inside
  it('should display Headline2 tag with the proper title', () => {
    cy.get('#root').find('._home_12nuw_1>button').as('cta')
    cy.get('@cta').click()
    cy.get('#root').find('h2').as('subtitle')
    cy.get('@subtitle').should('have.text', 'Number score: 0')
  })

  // We should have a CTA with specific text and it is clickable, which changes some other data
  it('should display CTA with the proper text', () => {
    cy.get('#root').find('._home_12nuw_1>button').as('cta')
    cy.get('@cta').click()
    cy.get('#root').find('button').as('cta')
    cy.get('@cta').should('have.text', 'Click to change the number using the store provided by zustand')
  })

  // We should have the CTA clickable, and with the click event, the subtitle content should properly change
  it('should update Headline2 tag with the proper content after clicking on CTA', () => {
    cy.get('#root').find('._home_12nuw_1>button').as('cta')
    cy.get('@cta').click()
    cy.get('#root').find('h2').as('subtitle')
    cy.get('@subtitle').should('have.text', 'Number score: 0')
    cy.get('#root').find('button').as('cta')
    cy.get('@cta').click()
    cy.get('@subtitle').should('have.text', 'Number score: 1')
    cy.get('@cta').click()
    cy.get('@subtitle').should('have.text', 'Number score: 2')
    cy.get('@cta').click()
    cy.get('@cta').click()
    cy.get('@cta').click()
    cy.get('@cta').click()
    cy.get('@cta').click()
    cy.get('@cta').click()
    cy.get('@cta').click()
    cy.get('@cta').click()
    cy.get('@cta').click()
    cy.get('@subtitle').should('have.text', 'Number score: 11')
  })
})
