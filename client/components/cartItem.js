import React, {Component} from 'react'
import {removingCartItem, addingCartItem} from '../store/cart'
import {connect} from 'react-redux'

class CartItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMinus = this.handleMinus.bind(this)
  }
  addItem = item => {
    this.props.addCartItem(item)
    // that is dispatch
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
    }
  }

  handleClick() {
    this.setState({
      quantity: this.state.quantity + 1
    })
  }

  handleMinus() {
    this.setState({
      quantity: this.state.quantity - 1
    })
    if (this.state.quantity === 1) {
      this.removeItem(this.props.item.id)
    }
  }

  render() {
    const {product, id} = this.props.item
    return (
      <div>
        <h2>{product.name}</h2>
        {/* eventually to add ability to update quantity */}
        <h3>Quantity: {this.state.quantity}</h3>
        <button className="btn btn-success" onClick={this.handleClick}>
          +
        </button>
        <button className="btn btn-danger" onClick={this.handleMinus}>
          -
        </button>
        <h2>${product.price}</h2>
        <button className="btn btn-danger" onClick={() => this.removeItem(id)}>
          Delete
        </button>
      </div>
    )
  }
}

const dispatchToProps = dispatch => {
  return {
    removeCartItem: id => dispatch(removingCartItem(id)),
    addCartItem: item => dispatch(addingCartItem(item))
  }
}

export default connect(null, dispatchToProps)(CartItem)
