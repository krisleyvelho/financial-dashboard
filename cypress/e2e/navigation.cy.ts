describe('Dashboard Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the home page', () => {
    cy.contains('Financial Dashboard').should('be.visible')
    cy.contains('Gestão financeira inteligente').should('be.visible')
  })

  it('should navigate to dashboard', () => {
    cy.contains('Acessar Dashboard').click()
    cy.url().should('include', '/dashboard')
  })

  it('should navigate to all feature pages', () => {
    // Dashboard
    cy.contains('a', 'Dashboard').click()
    cy.url().should('include', '/dashboard')
    cy.go('back')

    // Transactions
    cy.contains('a', 'Transações').click()
    cy.url().should('include', '/transactions')
    cy.go('back')

    // Investments
    cy.contains('a', 'Investimentos').click()
    cy.url().should('include', '/investments')
    cy.go('back')

    // Geographic
    cy.contains('a', 'Análise Geográfica').click()
    cy.url().should('include', '/geographic')
  })
})
