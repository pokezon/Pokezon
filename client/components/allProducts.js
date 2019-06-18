import React, {Component} from 'react'
import {gettingAllProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  addingCartItem,
  gettingCart,
  updatingCartItem,
  gettingProduct
} from '../store/cart'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
    if (this.props.isLoggedIn) {
      this.props.gettingCart()
    }
  }

  addItem = product => {
    if (this.props.isLoggedIn) {
      const foundItemInCart = this.props.cart.find(
        cartItem => cartItem.productId === product.id
      )
      if (foundItemInCart) {
        this.props.updatingCartItem({
          id: foundItemInCart.id,
          quantity: foundItemInCart.quantity + 1
        })
      } else {
        this.props.addCartItem(product)
      }
      // that is dispatch
    } else {
      let localStorageCart = JSON.parse(
        localStorage.getItem('LocalStorageCart')
      )
      const foundItemInCart = localStorageCart.find(
        cartItem => cartItem.product.id === product.id
      )
      if (foundItemInCart) {
        localStorageCart = localStorageCart.map(item => {
          if (item.id === foundItemInCart.id) {
            return {
              id: item.id,
              product: product,
              quantity: 1 + foundItemInCart.quantity
            }
          }
          return item
        })
      } else {
        localStorageCart.push({
          id: localStorageCart.length,
          product: product,
          quantity: 1
        })
      }

      localStorage.setItem('LocalStorageCart', JSON.stringify(localStorageCart))
    }
  }

  render() {
    return (
      <div>
        {!this.props.allProducts ? (
          'WEBSITE SEIZED BY THE U.S. GOVERNMENT'
        ) : (
          <div>
            <div className="container">
              {/* <h2 className="text-center">Our Wonderful Collection</h2> */}
              <div className="row">
                {this.props.allProducts.map(product => {
                  return (
                    <div key={product.id} className="eachProduct test">
                      <br />

                      <div className="thumbnail">
                        <Link to={`/products/${product.id}`} align="center">
                          <img src={product.imageUrl} width="50%" />
                        </Link>
                        <br />
                        <div className="thumbnailInfo">
                          <h4 align="center">{product.name}</h4>
                          <p align="center">The {product.type} Pokémon</p>
                          <h5 align="center">
                            <img
                              src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Coin-512.png"
                              width="8%"
                              align="center"
                            />${product.price}
                          </h5>
                          {/* <img src='https://static.thenounproject.com/png/551641-200.png' width='50'/> */}
                          <div align="center">
                            <img
                              src="https://i.ya-webdesign.com/images/open-pokeball-png-8.png"
                              width="8%"
                            />
                            <button
                              className="btn btn-primary"
                              onClick={() => this.addItem(product)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.products.allProducts,
  product: state.products.selectedProduct,
  isLoggedIn: !!state.user.id,
  cart: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(gettingAllProducts()),
  gettingCart: () => dispatch(gettingCart()),
  updatingCartItem: item => dispatch(updatingCartItem(item)),
  etProduct: id => dispatch(gettingProduct(id)),
  addCartItem: product => dispatch(addingCartItem(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
