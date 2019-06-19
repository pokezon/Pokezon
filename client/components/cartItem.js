import React, {Component} from 'react'
import {removingCartItem, updatingCartItem} from '../store/cart'
import {connect} from 'react-redux'

export class CartItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }
  componentDidMount() {
    this.setState({quantity: this.props.item.quantity})
  }

  removeItem = id => {
    if (this.props.isLoggedIn) {
      this.props.removeCartItem(id)
    } else {
      let localStorageCart = JSON.parse(
        localStorage.getItem('LocalStorageCart')
      )
      localStorageCart = localStorageCart.filter(entry => entry.id !== id)
      localStorage.setItem('LocalStorageCart', JSON.stringify(localStorageCart))
      this.props.deleteLocalCartItem(id)
    }
  }

  incrementQuantity = () => {
    const {quantity} = this.state
    const {isLoggedIn, updatingCartItem, item} = this.props
    if (isLoggedIn) {
      updatingCartItem({...item, quantity: quantity + 1})
    } else {
      let localStorageCart = JSON.parse(
        localStorage.getItem('LocalStorageCart')
      )
      localStorageCart = localStorageCart.map(
        entry =>
          entry.id === item.id ? {...entry, quantity: quantity + 1} : entry
      )
      localStorage.setItem('LocalStorageCart', JSON.stringify(localStorageCart))
    }
    this.setState(prevState => ({
      quantity: prevState.quantity + 1
    }))
  }

  decrementQuantity = () => {
    const {quantity} = this.state
    const {isLoggedIn, updatingCartItem, item, deleteLocalCartItem} = this.props

    if (quantity === 1) {
      isLoggedIn
        ? this.removeItem(this.props.item.id)
        : deleteLocalCartItem(item.id)
    } else if (!isLoggedIn) {
      let localStorageCart = JSON.parse(
        localStorage.getItem('LocalStorageCart')
      )
      localStorageCart = localStorageCart.map(
        entry =>
          entry.id === item.id ? {...entry, quantity: quantity - 1} : entry
      )
      localStorage.setItem('LocalStorageCart', JSON.stringify(localStorageCart))
    } else {
      updatingCartItem({...item, quantity: quantity - 1})
    }
    this.setState(prevState => ({
      quantity: prevState.quantity - 1
    }))
  }

  render() {
    const {product, id} = this.props.item
    return (
      <div align="center">
        <div className="cartItemBox">
          <h3>
            {product.name} <img src={product.imageUrl} width="18%" />
          </h3>
          <div>
            <h5>Quantity: {this.state.quantity}</h5>
            <button
              className="btn btn-success"
              onClick={this.incrementQuantity}
              type="button"
              id="brand-name"
            >
              +
            </button>
            <button
              className="btn btn-danger"
              onClick={this.decrementQuantity}
              type="button"
              id="brand-name"
            >
              -
            </button>
            <br />
            <br />
          </div>
          <h5>
            <img
              src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Coin-512.png"
              width="8%"
              align="center"
            />{' '}
            ${product.price}
          </h5>
          <div>
            <button
              className="btn btn-danger"
              onClick={() => this.removeItem(id)}
              type="button"
              id="brand-name"
            >
              Delete
            </button>
          </div>
        </div>
        <br />
      </div>
    )
  }
}

const dispatchToProps = dispatch => {
  return {
    removeCartItem: id => dispatch(removingCartItem(id)),
    updatingCartItem: item => dispatch(updatingCartItem(item))
  }
}

export default connect(null, dispatchToProps)(CartItem)
