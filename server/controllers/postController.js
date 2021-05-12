const Post = require('../model/Post')
const User = require('../model/User')
const fileService = require('../service/fileService')

class postController {
  async create(req, res) {
    try {
      const { authorId, title, description, date } = req.body
      const { picture } = req.files

      const author = await User.findById(authorId)
      const { username, avatar } = author

      const fileName = fileService.saveFile(picture)
      const post = await Post.create({
        authorId,
        title,
        description,
        picture: fileName,
        date,
        username,
        avatar,
      })
      res.json(post)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)

      let offset = page * limit - limit
      const totalCount = await Post.countDocuments()
      const posts = await Post.find().skip(offset).limit(limit)

      return res.json({ posts, totalCount })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({ message: 'id не указан' })
      }

      const post = await Post.findById(id)
      return res.json(post)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new postController()
