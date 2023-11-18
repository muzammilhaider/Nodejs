const express = require('express')
const router = express.Router()
const { getUsers, registration, userUpdate, deleteUser, viewUser } = require('../controller/userController')
const { auth } = require('../middleware/auth')

router.get('/user', auth, getUsers)
router.get('/user/:id', auth, viewUser)
router.put('/user/:id', auth, userUpdate)
router.delete('/user/:id', auth, deleteUser)
router.post('/user', registration)

module.exports = router
