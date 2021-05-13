const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const { check } = require('express-validator')
const roleMiddleware = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Слишком маленький или большой пароль').isLength({ min: 4, max: 25 }),
  ],
  userController.registration
)
router.post('/login', userController.login)
router.get('/check', authMiddleware, userController.checkAuth)
router.get('/users', roleMiddleware(['ADMIN']), userController.getUsers)
router.put('/avatar', userController.updateAvatar)

module.exports = router
