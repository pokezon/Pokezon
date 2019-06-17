import React, {Component} from 'react'
import {gettingAllProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

class Featured extends Component {
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
            <h2 className="text-center text-danger">Welcome to pokezon.</h2>
            <br />
            <div>
              <Carousel className="carousel-caption d-none d-md-block">
                <Carousel.Item>
                  <Link to="/products/4">
                    <img
                      src="https://vignette.wikia.nocookie.net/pokemon/images/e/e4/Tierno_Charmander.png/revision/latest?cb=20171128041706"
                      width="87%"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h2 className="text-white">MORE CHARMANDERS!</h2>
                      <p className="text-white ">
                        Due to popular demand. Everyone's favorite lizard is
                        back in stock!
                      </p>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
                <Carousel.Item>
                  <Link to="/products/8">
                    <img
                      src="https://cdna.artstation.com/p/assets/images/images/009/896/578/large/ubeyd-yuruk-screenshot001.jpg?1521473780"
                      width="87%"
                      alt="Second slide"
                    />

                    <Carousel.Caption className="text-dark">
                      <h2 className="text-white">SQUAD UP</h2>
                      <p className="text-white">The boys are back</p>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>

                <Carousel.Item>
                  <Link to="/products/128">
                    <img
                      src="https://daily.pokecommunity.com/wp-content/uploads/2016/04/whos_that_pokemon_eevee.png"
                      width="87%"
                      alt="Third slide"
                    />

                    <Carousel.Caption className="text-dark">
                      <h2 className="text-white">
                        And Our Pokemon of the Month is..........!!!
                      </h2>
                      <p className="text-white">Everyone loves this pokemon!</p>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              </Carousel>
            </div>
            <br />
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

export default connect(mapStateToProps, mapDispatchToProps)(Featured)