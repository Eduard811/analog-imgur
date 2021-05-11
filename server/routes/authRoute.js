const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const roleMiddleware = require('../middleware/roleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Слишком маленький или большой пароль').isLength({ min: 4, max: 25 }),
  ],
  authController.registration
)
router.post('/login', authController.login)
router.get('/check', authMiddleware, authController.checkAuth)
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)
router.put('/avatar', authController.updateAvatar)

module.exports = router
