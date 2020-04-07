describe('Kirjautuminen', function () {
  beforeEach(function () {
    // Tyhjennetään testitietokanta
    cy.request('POST', 'http://localhost:5000/api/testing/reset')
    
    // Lisätään admin käyttäjä tietokantaan
    const user = {
      kayttajatunnus: 'admin',
      salasana: 'admin',
      rooli: 'admin'
    }
    cy.request('POST', 'http://localhost:5000/api/users', user)
    
    cy.visit('http://localhost:3000')
  })

  it('etusivu voidaan avata', function () {
    cy.contains('Kirjaudu sisään')
  })

  it('admin voi kirjautua sisään. Admin näkee tarvikkeet ja ostoslistat', function () {
    cy.get('#kayttajatunnus').type('admin')
    cy.get('#salasana').type('admin')
    cy.get('#kirjautumisnappi').click()
    cy.contains('Tarvikkeet')
    cy.contains('Ostoslistat')
  })

  describe('kirjautunut admin', function () {
    beforeEach(function () {
      cy.get('#kayttajatunnus').type('admin')
      cy.get('#salasana').type('admin')
      cy.get('#kirjautumisnappi').click()
    })

    it('voi kirjautua ulos', function () {
      cy.get('#valikko-alas').click()
      cy.get('#kirjaudu-ulos').click()
    })
  })


})