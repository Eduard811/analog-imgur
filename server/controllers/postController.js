const Post = require('../model/Post')
const fileService = require('../service/fileService')

class postController {
  async create(req, res) {
    try {
      const { title, description } = req.body
      const { picture } = req.files

      const i = picture.name.indexOf('.')
      const format = i === -1 ? picture.name : picture.name.slice(i)

      const fileName = fileService.saveFile(picture, format)
      const post = await Post.create({ title, description, picture: fileName })
      res.json(post)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getAll(req, res) {
    try {
      const posts = await Post.find()
      return res.json(posts)
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
