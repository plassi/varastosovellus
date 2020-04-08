describe('Tarvikkeet kirjautuneelle käyttäjälle', function () {
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

    // Kirjaudutaan sisään backendissä
    cy.kirjaudu({ kayttajatunnus: user.kayttajatunnus, salasana: user.salasana })
    // Lisätään esimerkkitarvikkeet tietokantaan
    const tarvikkeet = require('../fixtures/tarvikes.json')
    cy.lisaaTarvikkeet(tarvikkeet)

    // Mennään etusivulle
    cy.visit('http://localhost:3000/tarvikkeet')

  })

  it('Kirjautuneelle käyttäjälle avautuu Tarvikenäkymä', function () {
    cy.contains('Tarvikkeet')
  })

  it('käyttäjä voi lisätä tarvikkeen', function () {

    const uusiTarvike = {
      nimi: 'Kakkosnelonen',
      kategoria: 'Puutavara',
      kuvaus: '2x4" lankkua',
      maara: 3,
      maarayksikko: "kpl",
      sijainti: "D6"
    }

    cy.get('#lisaa-tarvike-button').click()

    cy.get('#nimi').type(uusiTarvike.nimi)
    cy.get('#kategoria').type(uusiTarvike.kategoria)
    cy.get('#kuvaus').type(uusiTarvike.kuvaus)
    cy.get('#maara').type(uusiTarvike.maara)
    cy.get('#maarayksikko').type(uusiTarvike.maarayksikko)
    cy.get('#sijainti').type(uusiTarvike.sijainti)
    cy.get('#modal-lisaa-tarvike-button').click()
    cy.contains('Kakkosnelonen')
  })

  it('Käyttäjä voi poistaa tarvikkeen', function () {
    cy.contains('Kumivasara').click()
    cy.get('#tarvike-muokkaa-button').click()
    cy.get('#tarvike-poista-button').click()
    
    cy.get('html').should('not.contain', 'Kumivasara')
  })

  it('Käyttäjä voi muokata tarviketta', function () {
    cy.contains('Kumivasara').click()
    cy.get('#tarvike-muokkaa-button').click()
    cy.get('#nimi').clear().type('Vamikusara')
    cy.get('#kuvaus').clear().type('Vaminen kusara')
    cy.get('#tarvike-tallenna-button').click()
    
    cy.get('html').should('not.contain', 'Kumivasara')
    cy.get('html').should('contain', 'Vamikusara')
  })

})