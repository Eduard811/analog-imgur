const User = require('../model/User')
const Role = require('../model/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')

const generateAccessToken = (id, roles, username) => {
  const payload = { id, roles, username }

  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка при регистрации', errors })
      }

      const { username, password } = req.body
      const candidate = await User.findOne({ username })

      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким именем уже существует' })
      }

      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({ value: 'USER' })
      const user = new User({ username, password: hashPassword, roles: [userRole.value] })

      await user.save()

      const token = generateAccessToken(user._id, user.roles, user.username)
      return res.json({ token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'registration error' })
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })

      if (!user) {
        // return res.status(400).json({message: `Пользователь ${username} не найден`})
        return res.status(400).json({ message: 'Неверный логин или пароль' })
      }

      const validPassword = bcrypt.compareSync(password, user.password)

      if (!validPassword) {
        // return res.status(400).json({message: 'Введен неверный пароль'})
        return res.status(400).json({ message: 'Неверный логин или пароль' })
      }

      const token = generateAccessToken(user._id, user.roles, user.username)
      return res.json({ token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'login error' })
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      console.log(error)
    }
  }

  async checkAuth(req, res) {
    const { id, roles, username } = req.user
    const token = generateAccessToken(id, roles, username)
    return res.json({ token })
  }
}

module.exports = new authController()
