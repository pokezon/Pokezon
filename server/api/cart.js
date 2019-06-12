const router = require('express').Router()
const {Order} = require('../db/models')
const crypto = require('crypto')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findAll({
        where: {
          userId: req.user.id,
          completedFlag: false
        }
      })
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})
