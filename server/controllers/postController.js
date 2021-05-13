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

  async likeOrDislike(req, res) {
    try {
      const postId = req.params.id
      const userId = req.user.id

      if (!postId || !userId) {
        return res.status(400).json({ message: 'id не указан' })
      }
      const likeId = userId + postId
      const post = await Post.findById(postId)
      const isLike = post.likes.some((el) => el.likeId === likeId)
      const like = { likeId }

      const updateUser = isLike
        ? await User.findByIdAndUpdate(userId, { $pull: { favoritePosts: like } }, { new: true })
        : await User.findByIdAndUpdate(userId, { $push: { favoritePosts: like } }, { new: true })

      const updatePost = isLike
        ? await Post.findByIdAndUpdate(postId, { $pull: { likes: like } }, { new: true })
        : await Post.findByIdAndUpdate(postId, { $push: { likes: like } }, { new: true })

      const { favoritePosts } = updateUser
      const { likes } = updatePost

      return res.json({ likes, favoritePosts })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new postController()
