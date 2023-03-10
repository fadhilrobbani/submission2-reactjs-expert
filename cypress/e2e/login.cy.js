/**
 * test scenario
 *
 * - Login spec cypress
 *  - should display login page correctly
 *  - should display alert when clicked Login Button if form is empty
 *  - should display alert when clicked Login Button if password is empty
 *  - should display alert when clicked Login Button if username or password is wrong
 *  - should navigate to homepage then display logout button in BottomBar and component AddThreadButton should be visible if login success
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('footer span').contains('Login').click();
  });
  it('should display login page correctly', () => {
    cy.get('#email').should('be.visible');
    cy.get('input[placeholder="******"]').should('be.visible');
    cy.get('#loginUser').should('be.visible');
  });
  it('should display alert when clicked Login Button if form is empty', () => {
    cy.get('#loginUser').click();
    cy.on('window:alert', (str) => {
      expect(str).toBe('"email" is not allowed to be empty');
    });
  });
  it('should display alert when clicked Login Button if password is empty', () => {
    cy.get('#email').type('testuser@email.com');

    cy.get('#loginUser').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });
  it('should display alert when clicked Login Button if username or password is wrong', () => {
    cy.get('#email').type('testuser@email.com');
    cy.get('input[placeholder="******"]').type('salah');

    cy.get('#loginUser').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });
  it('should navigate to homepage then display logout button in BottomBar and component AddThreadButton should be visible if login success', () => {
    cy.get('#email').type('kucingoren@gmail.com');
    cy.get('input[placeholder="******"]').type('kucingoren');

    cy.get('#loginUser').click();

    cy.get('footer span').contains('Logout').should('be.visible');
    cy.get('#addThreadButton').should('be.visible');
  });
});
