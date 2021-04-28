const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/index')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://eduard:eduard@cluster0.nvats.mongodb.net/analog-imgur?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}
start()
