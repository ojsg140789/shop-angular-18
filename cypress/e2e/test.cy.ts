describe('Login Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/login');
    });
  
    it('Debe aparecer el formulario de login', () => {
      cy.get('#validationCustomEmail').should('be.visible');
      cy.get('#validationCustomPassword').should('be.visible');
      cy.get('.btn-secondary', { timeout: 10000 }).eq(0).should('be.visible');
    });
  
    it('Debe mostrar mensaje de credenciales erroneas', () => {
      cy.get('#validationCustomEmail').type('invaliduser@gmail.com');
      cy.get('#validationCustomPassword').type('wrongpassword');
      cy.get('.btn-secondary', { timeout: 10000 }).eq(0).click();
      cy.get('.swal2-title').should('contain', 'El correo y/o contraseña incorrectos');
    });
  
    it('Debe mostrar Dashboard con login exitoso', () => {
      cy.get('#validationCustomEmail').type('bar@gmail.com');
      cy.get('#validationCustomPassword').type('1234567890');
      cy.get('.btn-secondary', { timeout: 10000 }).eq(0).click();
      cy.url().should('include', '/dashboard');
    });
  });