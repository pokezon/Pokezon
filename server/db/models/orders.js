const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 99
    }
  },
  completedFlag: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  completedOrderId: {
    type: Sequelize.STRING
  }
})

module.exports = Order

// Quanity - we need something to check before anything is actually executed if we have enough of the product in the inventory to even execute. Possibly a front end consideration.

//For Order ID - We need completedFlag to be true. Then orderId uniquely randomly generated. Must be unique for each executed transaction??? From transitioning cart to purchase
