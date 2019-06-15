const router = require('express').Router()
const {User} = require('../db/models')
const crypto = require('crypto')

module.exports = router

router.put('/', async (req, res, next) => {
  const user = req.body.username
  console.log('----------req.body----------', req.body)
  try {
    const final = await User.update(
      {username: user},
      {
        where: {
          id: 1
        },
        returning: true,
        plain: true
      }
    )
    res.send(final)
  } catch (error) {
    console.log(error)
  }
})
