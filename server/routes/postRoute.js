const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, postController.create)
router.get('/', postController.getAll)
router.get('/:id', postController.getOne)
router.put('/:id', authMiddleware, postController.likeOrDislike)

module.exports = router
