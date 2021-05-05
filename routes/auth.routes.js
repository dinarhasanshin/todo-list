const {Router} = require('express')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = Router()

//todoApi/auth/register
router.post(
    '/register',
    [
        check('name', 'Слишком короткое имя').isLength({ min: 2 }),
        check('email', 'Неверный email').isEmail(),
        check('password', 'Минимальная длинна пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неверные данные'
                })
            }

            const {email, password, name} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({
                    message: 'Этот email уже используется'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await new User({
                email,
                password: hashedPassword,
                name
            })

            await user.save()

            res.status(201).json({
                message: 'Пользователь создан'
            })


        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    }
)

router.post('/login', [
        check('email', 'Неверный email').normalizeEmail().isEmail(),
        check('password', 'Неверный пароль').isLength({min: 6}).exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return res.status(400).json({
                    message: 'Неправильный логин или пароль'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user){
                return res.status(400).json({
                    message: 'Пользователь не найден'
                })
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch){
                return res.status(400).json({
                    message: 'Неверный логин или пароль'
                })
            }

            const token = jwt.sign({ userId: user.id }, 'SocialNetwork', { expiresIn: '5h' })

            res.json({
                token, userId: user.id
            })
        } catch (e) {

        }
    })

module.exports = router