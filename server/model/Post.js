const { Schema, model } = require('mongoose')

const Post = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: String, required: true },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
})

module.exports = model('Post', Post)
