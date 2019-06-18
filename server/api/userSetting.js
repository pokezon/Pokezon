const router = require('express').Router()
const {User} = require('../db/models')
const crypto = require('crypto')

module.exports = router

router.put('/', async (req, res, next) => {
  const {currentUsername, newUsername} = req.body
  console.log(currentUsername, newUsername)
  try {
    const final = await User.update(
      {username: newUsername},
      {
        where: {
          username: currentUsername
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
