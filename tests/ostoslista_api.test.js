const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Tarvike = require('../models/Tarvike')
const Ostoslista = require('../models/Ostoslista')
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
    await Ostoslista.deleteMany({})
    await Ostoslista.insertMany(helper.initialOstoslistat)
  })

  test('ostoslistat palautetaan json:na', async () => {
    await api
      .get('/api/ostoslistat')
      .set('x-auth-token', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })

  test('kaikki ostoslistat voidaan hakea', async () => {
    const response = await api.get('/api/ostoslistat').set('x-auth-token', token)

    expect(response.body.length).toBe(helper.initialOstoslistat.length)
  })

  test('ostoslista voidaan lisätä', async () => {
    const uusiOstoslista = {
      nimi: 'Ostoslista 3',
    }

    await api
      .post('/api/ostoslistat')
      .send(uusiOstoslista)
      .set('x-auth-token', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const ostoslistatAtEnd = await helper.ostoslistatInDb()
    expect(ostoslistatAtEnd.length).toBe(helper.initialOstoslistat.length + 1)

    const nimet = ostoslistatAtEnd.map(n => n.nimi)
    expect(nimet).toContain(
      "Ostoslista 3"
    )
  })

  test('Nimettömän ostoslistan nimeksi tulee "nimeton"', async () => {
    const uusiOstoslista = {
    }

    await api
      .post('/api/ostoslistat')
      .set('x-auth-token', token)
      .send(uusiOstoslista)
      .expect(200)

    const ostoslistatAtEnd = await helper.ostoslistatInDb()
    expect(ostoslistatAtEnd.length).toBe(helper.initialOstoslistat.length + 1)

    const nimet = ostoslistatAtEnd.map(n => n.nimi)

    expect(nimet).toContain(
      "nimeton"
    )
  })

  test('Ostoslistan nimi voidaan vaihtaa', async () => {
    const ostoslistatAtStart = await helper.ostoslistatInDb()

    const ostoslistaToUpdate = {
      ...ostoslistatAtStart[0],
      nimi: "paivitettyOstoslista"
    }

    await api
      .put(`/api/ostoslistat/${ostoslistaToUpdate.id}`)
      .set('x-auth-token', token)
      .send(ostoslistaToUpdate)
      .expect(200)

    const ostoslistatAtEnd = await helper.ostoslistatInDb()

    expect(ostoslistatAtEnd.length).toBe(
      helper.initialOstoslistat.length
    )

    const nimet = ostoslistatAtEnd.map(r => r.nimi)

    expect(nimet).toContain(ostoslistaToUpdate.nimi)
  })

  test('Ostoslistalle voidaan lisätä tarvike', async () => {
    // Alustetaan tarvikkeet tietokantaan
    await Tarvike.deleteMany({})
    await Tarvike.insertMany(helper.initialTarvikkeet)

    const ostoslistatAtStart = await helper.ostoslistatInDb()
    const ostoslistaJolleLisataan = ostoslistatAtStart[0]

    const tarvikkeetAtStart = await helper.tarvikkeetInDb()
    const tarvikeJokaLisataan = tarvikkeetAtStart[0]

    // lisätään tarvikkeen id ostoslistaan
    ostoslistaJolleLisataan.tarvikkeet.push(tarvikeJokaLisataan.id)

    await api
      .put(`/api/ostoslistat/${ostoslistaJolleLisataan.id}`)
      .set('x-auth-token', token)
      .send(ostoslistaJolleLisataan)
      .expect(200)

    const ostoslistatAtEnd = await helper.ostoslistatInDb()

    expect(ostoslistatAtEnd.length).toBe(
      helper.initialOstoslistat.length
    )

    const muokattuLista = ostoslistatAtEnd[0]
    const tarvikeId = muokattuLista.tarvikkeet[0]

    expect(tarvikeId.toString()).toMatch(tarvikeJokaLisataan.id)
  })

  // test('Ostoslistalta voidaan poistaa tarvike', async () => {
  //   // Alustetaan tarvikkeet tietokantaan
  //   await Tarvike.deleteMany({})
  //   await Tarvike.insertMany(helper.initialTarvikkeet)

  //   const ostoslistatAtStart = await helper.ostoslistatInDb()
  //   const ostoslistaJolleLisataan = ostoslistatAtStart[0]

  //   const tarvikkeetAtStart = await helper.tarvikkeetInDb()
  //   const tarvikeJokaLisataan = tarvikkeetAtStart[0]

  //   // lisätään tarvikkeen id ostoslistaan
  //   ostoslistaJolleLisataan.tarvikkeet.push(tarvikeJokaLisataan.id)

  //   await api
  //     .put(`/api/ostoslistat/${ostoslistaJolleLisataan.id}`)
  //     .set('x-auth-token', token)
  //     .send(ostoslistaJolleLisataan)

  //   // haetaan tietokannasta ostoslista ja tarvike, joka poistetaan listalta

  //   const ostoslistat = await helper.ostoslistatInDb()
  //   const tarvikkeet = await helper.tarvikkeetInDb()

  //   // poistetaan aiemmin tietokantaan lisätty tarvike ostoslistalta
    
    
    

  // })

  test('Ostoslista voidaan poistaa', async () => {
    const ostoslistatAtStart = await helper.ostoslistatInDb()
    const OstoslistaToDelete = ostoslistatAtStart[0]

    await api
      .delete(`/api/ostoslistat/${OstoslistaToDelete.id}`)
      .set('x-auth-token', token)
      .expect(204)

    const ostoslistatAtEnd = await helper.ostoslistatInDb()

    expect(ostoslistatAtEnd.length).toBe(
      helper.initialOstoslistat.length - 1
    )

    const nimet = ostoslistatAtEnd.map(r => r.nimi)

    expect(nimet).not.toContain(OstoslistaToDelete.nimi)
  })

})

// describe('käyttäjä ei kirjautunut', () => {

//   beforeEach(async () => {
//     // Alustetaan tarvikkeet tietokantaan
//     await Ostoslista.deleteMany({})
//     await Ostoslista.insertMany(helper.initialOstoslistat)
//   })

//   test('tarvikkeiden haku palauttaa virheen 401 unauthorized', async () => {
//     const response = await api.get('/api/ostoslistat')
//       .expect(401)
//   })

//   test('tarvikkeiden lisäys palauttaa virheen 401 unauthorized', async () => {
//     const uusiOstoslista = {
//       nimi: 'Ostoslista 3',
//       kategoria: 'Tarvikkeen 3 kategoria',
//       kuvaus: 'Tarvikkeen 3 kuvaus',
//       maara: 30,
//       maarayksikko: "ltr",
//       sijainti: "C3",
//       hinta: "30"
//     }

//     await api
//       .post('/api/ostoslistat')
//       .send(uusiOstoslista)
//       .expect(401)
//   })

//   test('tarvikkeen muokkaus palauttaa virheen 401 unauthorized', async () => {
//     const ostoslistatAtStart = await helper.ostoslistatInDb()

//     const OstoslistaToUpdate = {
//       ...ostoslistatAtStart[0],
//       nimi: "paivitettyOstoslista"
//     } 

//     await api
//       .put(`/api/ostoslistat/${OstoslistaToUpdate.id}`)
//       .send(OstoslistaToUpdate)
//       .expect(401)

//     const ostoslistatAtEnd = await helper.ostoslistatInDb()

//     expect(ostoslistatAtEnd.length).toBe(
//       helper.initialOstoslistat.length
//     )

//     const nimet = ostoslistatAtEnd.map(r => r.nimi)

//     expect(nimet).not.toContain(OstoslistaToUpdate.nimi)
//   })

//   test('tarvikkeen poisto palauttaa virheen 401 unauthorized', async () => {
//     const ostoslistatAtStart = await helper.ostoslistatInDb()
//     const OstoslistaToDelete = ostoslistatAtStart[0]

//     await api
//       .delete(`/api/ostoslistat/${OstoslistaToDelete.id}`)
//       .expect(401)

//     const ostoslistatAtEnd = await helper.ostoslistatInDb()

//     expect(ostoslistatAtEnd.length).toBe(helper.initialOstoslistat.length)

//     const nimet = ostoslistatAtEnd.map(r => r.nimi)

//     expect(nimet).toContain(OstoslistaToDelete.nimi)
//   })


// })

afterAll(async () => {
  await mongoose.connection.close()
})