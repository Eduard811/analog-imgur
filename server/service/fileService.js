const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class fileService {
  saveFile(file, format) {
    try {
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
