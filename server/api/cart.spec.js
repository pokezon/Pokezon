const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

describe('Orders routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET api/cart', () => {
    it('returns a 401 for unauthorized access attempts', async () => {
      const res = await request(app)
        .get('/api/cart/')
        .expect(401)
    })
  })
})
