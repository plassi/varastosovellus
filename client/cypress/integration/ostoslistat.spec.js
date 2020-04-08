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
    const tarvikkeet = require('../fixtures/tarvikes.json')
    cy.lisaaTarvikkeet(tarvikkeet)

    // Mennään etusivulle ja kirjaudutaan sisään
    cy.visit('http://localhost:3000/ostoslistat')

  })

  it('Kirjautuneelle käyttäjälle avautuu ostoslistanäkymä', function () {
    cy.contains('Ostoslistat')
  })

  it('käyttäjä voi lisätä ostoslistan', function () {
    
  })

  it('Käyttäjä voi poistaa ostoslistan', function () {
    
  })

  it('Käyttäjä voi lisätä tarvikkeen ostoslistalle', function () {
    
  })

})