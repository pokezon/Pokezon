/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  const rapidash = {
    id: 78,
    name: 'Rapidash',
    type: 'Fire',
    price: 47.34,
    description: 'A Pokemon of Fire type with the base HP of 65',
    imageUrl:
      'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/078Rapidash.png',
    quantity: 52
  }
  const mew = {
    id: 151,
    name: 'Mew',
    imageUrl:
      'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/151Mew.png',
    type: 'Psychic',
    price: 91.21,
    description: 'A Pokemon of Psychic type with the base HP of 100',
    quantity: 53
  }

  beforeEach(async () => {
    await Product.create(mew)
    await Product.create(rapidash)
  })

  describe('GET api/products/', () => {
    it('returns ALL Pokemon inventory as an array', async () => {
      const res = await request(app)
        .get('/api/products/')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(2)
    })
  })

  describe('GET api/products/:productId', () => {
    it('returns a selected Pokemon based on the ID of the Pokemon', async () => {
      const res = await request(app)
        .get('/api/products/151')
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.name).to.equal('Mew')
    })
    it('sends a 404 if not found', async () => {
      await request(app)
        .get('/api/products/10000')
        .expect(404)
    })
  })
})
