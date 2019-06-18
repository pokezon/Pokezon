import {expect} from 'chai'
import {gettingAllProducts, gettingProduct} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    selectedProduct: {},
    allProducts: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getting all products', () => {
    it('eventually dispatches the GET ALL PRODUCTS action', async () => {
      mockAxios.onGet('/api/products/').replyOnce(200, [])
      await store.dispatch(gettingAllProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal([])
    })
  })

  describe('getting a specified product', () => {
    it('eventually dispatches the GET PRODUCT action', async () => {
      const fakeProduct = {product: 'Pikachu', id: 1}
      mockAxios.onGet('/api/products/1').replyOnce(200, fakeProduct)
      await store.dispatch(gettingProduct(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })
})
