import axios from 'axios'

// THIS IS INITIAL STATE
const initialState = {
  cartItems: []
}

// ACTION TYPE

const GET_ALL_CART_ITEMS = 'GET_ALL_CART_ITEMS'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

// ACTION CREATORS

const gotCart = items => ({type: GET_ALL_CART_ITEMS, items})
const addCartItem = item => ({
  type: ADD_CART_ITEM,
  item
})
const updateCart = (id, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  id,
  quantity
})
const removeCartItem = id => ({type: REMOVE_CART_ITEM, id})

// THUNKS

export const gettingCart = () => async dispatch => {
  try {
    const response = await axios.get(`/api/cart`)
    dispatch(gotCart(response.data))
  } catch (error) {
    console.error(error)
  }
}

export const addingCartItem = product => async dispatch => {
  try {
    const response = await axios.post(`/api/cart`, product)
    const item = await axios.get(`/api/cart/${response.data.id}`)
    dispatch(addCartItem(item.data))
  } catch (error) {
    console.error(error)
  }
}

export const updatingCartItem = item => async dispatch => {
  try {
    const response = await axios.put(`/api/cart/${item.id}`, item)
    dispatch(updateCart(response.data))
  } catch (error) {
    console.error(error)
  }
}

export const removingCartItem = id => async dispatch => {
  try {
    await axios.delete(`/api/cart/${id}`)
    dispatch(removeCartItem(id))
  } catch (error) {
    console.error(error)
  }
}

//REDUCERS

export default function(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state))
  // used to make deep copy without the need for spread operator
  switch (action.type) {
    case GET_ALL_CART_ITEMS:
      newState.cartItems = action.items
      break
    case ADD_CART_ITEM:
      newState.cartItems = newState.cartItems.concat(action.item)
      break
    case UPDATE_CART_ITEM_QUANTITY:
      newState.cartItems = newState.cartItems.map(item => {
        if (item.id === action.id) {
          // return {...item, quantity: action.quantity} //another way of doing this
          item.quantity = action.quantity
        }
        return item
      })
      break
    case REMOVE_CART_ITEM:
      newState.cartItems = newState.cartItems.filter(
        item => item.id !== action.id
      )
      break
    default:
      return state
  }
  return newState
}
