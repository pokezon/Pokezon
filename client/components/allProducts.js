import React, {Component} from 'react'
import {gettingAllProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
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
                      <div className="thumbnail">
                        <Link to={`/products/${product.id}`} align="center">
                          <img src={product.imageUrl} width="75%" />
                        </Link>
                        <br />
                        <div className="thumbnailInfo">
                          <h4 align="center">{product.name}</h4>
                          <p align="center">The {product.type} Pokémon</p>
                          <h5 align="center">
                            <img
                              src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Coin-512.png"
                              width="10%"
                              align="center"
                            />${product.price}
                          </h5>
                          {/* <img src='https://static.thenounproject.com/png/551641-200.png' width='50'/> */}
                          <div align="center">
                            <img
                              src="https://i.ya-webdesign.com/images/open-pokeball-png-8.png"
                              width="10%"
                            />
                            <button className="btn btn-primary" id="brand-name">
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

const mapStateToProps = state => ({allProducts: state.products.allProducts})

// FOR ME(AMNEET): PRODUCTS LAYER IS CREATED FROM REDUCER SO U NEED TO GO TO THAT LAYER

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(gettingAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
