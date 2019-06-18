import {expect} from 'chai'
import {gettingCart} from './cart'
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
    cartItems: [],
    orderHistory: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getting cart', () => {
    it('eventually dispatches the GET ALL CART ITEMS action', async () => {
      const fakeCart = ['pichu', 'raichu']
      mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
      await store.dispatch(gettingCart())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_CART_ITEMS')
      expect(actions[0].items).to.be.deep.equal(fakeCart)
    })
  })
})
