const User = require('../model/User')
const Role = require('../model/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')
const fileService = require('../service/fileService')
const Post = require('../model/Post')

const generateAccessToken = (id, roles, username) => {
  const payload = { id, roles, username }

  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class userController {
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
      return res.json({ token, avatar: '' })
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
      const { avatar } = user

      return res.json({ token, avatar })
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
    const user = await User.findOne({ username })
    const { avatar } = user

    return res.json({ token, avatar })
  }

  async updateAvatar(req, res) {
    try {
      const { id } = req.body
      const picture = req.files.avatar

      if (!id) {
        return res.status(400).json({ message: 'id не указан' })
      }

      const user = await User.findById(id)

      let fileName
      user.avatar
        ? (fileName = fileService.updateFile(picture, user.avatar))
        : (fileName = fileService.saveFile(picture))

      const updateUser = await User.findByIdAndUpdate(id, { avatar: fileName }, { new: true })
      const userPosts = await Post.updateMany({ authorId: id }, { avatar: fileName })
      const { avatar } = updateUser

      return res.json({ avatar })
    } catch (error) {
      res.status(400).json({ message: 'avatar error' })
    }
  }
}

module.exports = new userController()
