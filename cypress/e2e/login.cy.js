describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });
  it('should display login page correctly', () => {
    cy.get('#email').should('be.visible');
    cy.get('input[placeholder="******"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });
  it('should display alert', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).toBe('"email" is not allowed to be empty');
    });
  });
  it('should display alert when password is empty', () => {
    cy.get('#email').type('testuser@email.com');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });
  it('should display alert when username or password is wrong', () => {
    cy.get('#email').type('testuser@email.com');
    cy.get('input[placeholder="******"]').type('salah');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });
  it('should display logout button in BottomBar and navigate to Home and component AddThreadButton should be visible if login success', () => {
    cy.get('#email').type('kucingoren@gmail.com');
    cy.get('input[placeholder="******"]').type('kucingoren');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('footer span').contains('logout').should('be.visible');
    cy.get('#addThreadButton').should('be.visible');
  });
});
