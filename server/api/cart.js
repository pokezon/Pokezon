const router = require('express').Router()
const {Order, Product} = require('../db/models')
const crypto = require('crypto')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findAll({
        where: {
          userId: req.user.id,
          completedFlag: false
        },
        include: [{model: Product}]
      })
      res.json(cart)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/history', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await Order.findAll({
        where: {
          userId: req.user.id,
          completedFlag: true
        },
        include: [{model: Product}]
      })
      res.json(cart)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findByPk(req.params.id, {
        include: [{model: Product}]
      })
      res.json(order)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const {id: productId, quantity} = req.body
      const cart = await Order.create({
        productId,
        quantity,
        userId: req.user.id
      })
      res.status(201).json(cart)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (req.user) {
      const [numberOfAffectedRows, affectedRows] = await Order.update(
        {...req.body, userId: req.user.id},
        {
          where: {
            id: +req.params.id
          },
          returning: true, // needed for affectedRows to be populated
          plain: true // makes sure that the returned instances are just plain objects
        }
      )
      if (!affectedRows) {
        res.sendStatus(404)
      } else {
        res.json(affectedRows)
      }
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (req.user) {
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
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})
