const router = require('express').Router()
const {Order, Product} = require('../db/models')
const crypto = require('crypto')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // if (req.user) {
    const cart = await Order.findAll({
      where: {
        userId: req.user.id,
        completedFlag: false
      },
      include: [{model: Product}]
    })
    res.json(cart)
    // }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // if (req.user) {
    const order = await Order.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.json(order)
    // }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {id: productId, quantity} = req.body
    const cart = await Order.create({productId, quantity, userId: req.user.id})
    res.status(201).json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Order.update(req.body, {
      where: {
        id: +req.params.id
      },
      returning: true, // needed for affectedRows to be populated
      plain: true // makes sure that the returned instances are just plain objects
    })
    if (!affectedRows) {
      res.sendStatus(404)
    } else {
      res.json(affectedRows)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const affectRows = await Order.destroy({
      where: {
        id
      }
    })
    if (!affectRows) {
      res.sendStatus(404)
    } else {
      res.status(204).json(affectRows)
    }
  } catch (error) {
    next(error)
  }
})