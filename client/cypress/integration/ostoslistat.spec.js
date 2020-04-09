describe('Ostoslistat kirjautuneelle käyttäjälle', function () {
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

    // Haetaan token localStorageen
    cy.kirjaudu({ kayttajatunnus: user.kayttajatunnus, salasana: user.salasana })

    // Lisätään tarvikkeet tietokantaan
    // const tarvikkeet = require('../fixtures/tarvikes.json')
    // cy.lisaaTarvikkeet(tarvikkeet)

    // Mennään ostoslistasivulle
    cy.visit('http://localhost:3000/ostoslistat')

  })

  it('Kirjautuneelle käyttäjälle avautuu ostoslistanäkymä', function () {
    cy.contains('Ostoslistat')
  })

  it('käyttäjä voi lisätä ostoslistan', function () {
    cy.get('#ostoslista-lisaa-button').click()
    cy.get('input[name="nimi"]').type('Uusi ostoslista')
    cy.get('#lisaa-ostoslista-modal-button').click()
  })

  describe('Ostoslistoja on valmiina', function () {
    beforeEach(function () {
      const ostoslistat = [
        {
          nimi: 'Ostoslista 1'
        },
        {
          nimi: 'Ostoslista 2'
        },
        {
          nimi: 'Ostoslista 3'
        },
      ]
      cy.lisaaOstoslistat(ostoslistat)
      // Mennään ostoslistasivulle
      cy.visit('http://localhost:3000/ostoslistat')
    })

    it('Käyttäjä voi poistaa ostoslistan', function () {
      cy.get('.remove-btn:first').click()
      cy.get('html').should('not.contain', 'Ostoslista 1')
    })

    // it('Käyttäjä voi lisätä tarvikkeen ostoslistalle', function () {

    // })

  })

})