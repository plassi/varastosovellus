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

  })

  it('Kirjautuneelle käyttäjälle avautuu ostoslistanäkymä', function () {
    // Mennään ostoslistasivulle
    cy.visit('http://localhost:3000/ostoslistat')

    cy.contains('Ostoslistat')
  })

  it('käyttäjä voi lisätä ostoslistan', function () {
    // Mennään ostoslistasivulle
    cy.visit('http://localhost:3000/ostoslistat')

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
    })

    it('Käyttäjä voi poistaa ostoslistan', function () {
      // Mennään ostoslistasivulle
      cy.visit('http://localhost:3000/ostoslistat')
      cy.get('.remove-btn:first').click()
      cy.get('html').should('not.contain', 'Ostoslista 1')
    })

    it('Käyttäjä voi valita ostoslistan', function () {
      // Mennään ostoslistasivulle
      cy.visit('http://localhost:3000/ostoslistat')
      cy.get('#ostoslista-avaa-button').click()
    })

  })

  describe('Ostoslistoja ja tarvikkeita on valmiina', function () {
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
      // Lisätään ostoslistat tietokantaan
      cy.lisaaOstoslistat(ostoslistat)
      // Lisätään tarvikkeet tietokantaan
      const tarvikkeet = require('../fixtures/tarvikes.json')
      cy.lisaaTarvikkeet(tarvikkeet)
      // Mennään ostoslistasivulle
      cy.visit('http://localhost:3000/ostoslistat')
    })

    it('Käyttäjä voi valita ostoslistan', function () {
      // Mennään ostoslistasivulle
      cy.visit('http://localhost:3000/ostoslistat')
      cy.get('#ostoslista-avaa-button').click()
    })

    // Käyttäjä voi lisätä tarvikkeen ostoslistalle

    // Jos ostoslistalla on jo tarvikkeita

    // // Käyttäjä voi poistaa tarvikkeen ostoslistalta

    // // Käyttäjä voi muokata ostoslistalla olevien tarvikkeiden määriä

  })

})