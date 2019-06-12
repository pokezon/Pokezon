import axios from 'axios'

// THIS IS INITIAL STATE
const initialState = {
  selectedProduct: {},
  allProducts: []
}

// ACTION TYPE

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'

// ACTION CREATORS

const gotAllProducts = products => ({type: GET_ALL_PRODUCTS, products})

const gotProduct = product => ({type: GET_PRODUCT, product})

// THUNKS

export const gettingAllProducts = () => async dispatch => {
  const response = await axios.get('/api/products/')
  dispatch(gotAllProducts(response.data))
}

export const gettingProduct = productId => async dispatch => {
  const response = await axios.get(`/api/products/${productId}`)
  dispatch(gotProduct(response.data))
}

//REDUCERS

export default function(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state))
  // used to make deep copy without the need for spread operator
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      newState.allProducts = action.products
      break
    case GET_PRODUCT:
      newState.selectedProduct = action.product
      break
    default:
      return state
  }
  return newState
}
