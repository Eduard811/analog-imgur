const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class fileService {
  saveFile(file) {
    try {
      const i = file.name.indexOf('.')
      const format = i === -1 ? file.name : file.name.slice(i)

      const fileName = uuid.v4() + format
      const filePath = path.resolve('static', fileName)
      file.mv(filePath)
      return fileName
    } catch (error) {
      console.log(error)
    }
  }

  deleteFile(fileName) {
    try {
      const filePath = path.resolve('static', fileName)
      fs.unlinkSync(filePath)
    } catch (error) {
      console.log(error)
    }
  }

  updateFile(file, prevName, format) {
    try {
      this.deleteFile(prevName)

      const i = file.name.indexOf('.')
      const format = i === -1 ? file.name : file.name.slice(i)

      const fileName = uuid.v4() + format
      const filePath = path.resolve('static', fileName)
      file.mv(filePath)
      return fileName
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new fileService()
