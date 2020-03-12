const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Tarvike = require('../models/Tarvike')
const User = require('../models/User')

describe('Admin kirjautunut', () => {

  // Tunnistautumis token
  let token = ""

  beforeAll(async () => {
    // Tyhjennä User tietue
    await User.deleteMany({})

    // lisää admin
    await api
      .post('/api/users')
      .send(helper.adminUser)

    // Hae kirjautumistoken
    const response = await api
      .post('/api/auth')
      .send(helper.adminUser)

    token = response.body.token
  })

  beforeEach(async () => {
    // Alustetaan tarvikkeet tietokantaan
    await Tarvike.deleteMany({})
    await Tarvike.insertMany(helper.initialTarvikkeet)
  })

  test('tarvikkeet tulevat json:na', async () => {
    await api
      .get('/api/tarvikkeet')
      .set('x-auth-token', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('kaikki tarvikkeet voidaan hakea', async () => {
    const response = await api.get('/api/tarvikkeet').set('x-auth-token', token)

    expect(response.body.length).toBe(helper.initialTarvikkeet.length)
  })



  test('tarvike voidaan lisätä', async () => {
    const uusiTarvike = {
      nimi: 'Tarvike 3',
      kategoria: 'Tarvikkeen 3 kategoria',
      kuvaus: 'Tarvikkeen 3 kuvaus',
      maara: 30,
      maarayksikko: "ltr",
      sijainti: "C3",
      hinta: "30"
    }
    
    await api
      .post('/api/tarvikkeet')
      .send(uusiTarvike)
      .set('x-auth-token', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const tarvikkeetAtEnd = await helper.tarvikkeetInDb()
    expect(tarvikkeetAtEnd.length).toBe(helper.initialTarvikkeet.length + 1)

    const nimet = tarvikkeetAtEnd.map(n => n.nimi)
    expect(nimet).toContain(
      "Tarvike 3"
    )
  })

  test('tarviketta ilman nimeä ei lisätä', async () => {
    const uusiTarvike = {
      kategoria: "jotain"
    }

    await api
      .post('/api/tarvikkeet')
      .set('x-auth-token', token)
      .send(uusiTarvike)
      .expect(400)

    const tarvikkeetAtEnd = await helper.tarvikkeetInDb()

    expect(tarvikkeetAtEnd.length).toBe(helper.initialTarvikkeet.length)
  })

  test('tarvike voidaan poistaa', async () => {
    const tarvikkeetAtStart = await helper.tarvikkeetInDb()
    const tarvikeToDelete = tarvikkeetAtStart[0]

    await api
      .delete(`/api/tarvikkeet/${tarvikeToDelete.id}`)
      .set('x-auth-token', token)
      .expect(204)

    const tarvikkeetAtEnd = await helper.tarvikkeetInDb()
    
    expect(tarvikkeetAtEnd.length).toBe(
      helper.initialTarvikkeet.length - 1
    )

    const nimet = tarvikkeetAtEnd.map(r => r.nimi)

    expect(nimet).not.toContain(tarvikeToDelete.nimi)
  })

})

describe('käyttäjä ei kirjautunut', () => {

  beforeEach(async () => {
    // Alustetaan tarvikkeet tietokantaan
    await Tarvike.deleteMany({})
    await Tarvike.insertMany(helper.initialTarvikkeet)
  })

  test('tarvikkeiden haku palauttaa virheen 401 unauthorized', async () => {
    const response = await api.get('/api/tarvikkeet')
      .expect(401)
  })

  test('tarvikkeiden lisäys palauttaa virheen 401 unauthorized', async () => {
    const uusiTarvike = {
      nimi: 'Tarvike 3',
      kategoria: 'Tarvikkeen 3 kategoria',
      kuvaus: 'Tarvikkeen 3 kuvaus',
      maara: 30,
      maarayksikko: "ltr",
      sijainti: "C3",
      hinta: "30"
    }
    
    await api
      .post('/api/tarvikkeet')
      .send(uusiTarvike)
      .expect(401)
  })

  test('tarvikkeen poisto aiheuttaa virheen 401 unauthorized', async () => {
    const tarvikkeetAtStart = await helper.tarvikkeetInDb()
    const tarvikeToDelete = tarvikkeetAtStart[0]

    await api
      .delete(`/api/tarvikkeet/${tarvikeToDelete.id}`)
      .expect(401)

    const tarvikkeetAtEnd = await helper.tarvikkeetInDb()
    
    expect(tarvikkeetAtEnd.length).toBe(helper.initialTarvikkeet.length)

    const nimet = tarvikkeetAtEnd.map(r => r.nimi)

    expect(nimet).toContain(tarvikeToDelete.nimi)
  })


})

afterAll(async () => {
  await mongoose.connection.close()
})