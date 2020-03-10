const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Tarvike = require('../models/Tarvike')

beforeEach(async () => {
  await Tarvike.deleteMany({})
  await Tarvike.insertMany(helper.initialTarvikkeet)
})

test('tarvikkeet tulevat json:na', async () => {
  await api
    .get('/api/tarvikkeet')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('kaikki tarvikkeet palautetaan', async () => {
  const response = await api.get('/api/tarvikkeet')

  expect(response.body.length).toBe(helper.initialTarvikkeet.length)
})

test('tietty tarvike on palautettavissa tarvikkeissa', async () => {
  const response = await api.get('/api/tarvikkeet')

  const nimet = response.body.map(r => r.nimi)

  expect(nimet).toContain(
    'Tarvike 2'
  )
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
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const tarvikkeetAtEnd = await helper.tarvikkeetInDb()
  expect(tarvikkeetAtEnd.length).toBe(helper.initialTarvikkeet.length + 1)

  const nimet = tarvikkeetAtEnd.map(n => n.nimi)
  expect(nimet).toContain(
    'Tarvike3'
  )
})

test('tarviketta ilman nimeä ei lisätä', async () => {
  const uusiTarvike = {
    kategoria: "jotain"
  }

  await api
    .post('/api/tarvikkeet')
    .send(uusiTarvike)
    .expect(400)

  const tarvikkeetAtEnd = await helper.tarvikkeetInDb()

  expect(tarvikkeetAtEnd.length).toBe(helper.initialTarvikkeet.length)
})

test('tietty tarvike voidaan hakea', async () => {
  const tarvikkeetAtStart = await helper.tarvikkeetInDb()

  const tarvikeToView = tarvikkeetAtStart[0]

  const resultTarvike = await api
    .get(`/api/tarvikkeet/${tarvikeToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultTarvike.body).toEqual(tarvikeToView)
})

test('tarvike voidaan poistaa', async () => {
  const tarvikeAtStart = await helper.tarvikkeetInDb()
  const tarvikeToDelete = tarvikeAtStart[0]

  await api
    .delete(`/api/tarvikeet/${tarvikeToDelete.id}`)
    .expect(204)

  const tarvikkeetAtEnd = await helper.tarvikkeetInDb()

  expect(tarvikeeetAtEnd.length).toBe(
    helper.initialTarvikkeet.length - 1
  )

  const nimet = notesAtEnd.map(r => r.nimi)

  expect(nimet).not.toContain(tarvikeToDelete.nimi)
})


afterAll(async () => {
  await mongoose.connection.close()
})