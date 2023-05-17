const {prisma} = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* 
@route POST /api/user/login
@desc Логин
@access Public
*/

const login = async (req, res) => {
    res.send('login');

    if (!email && !password) {
        return res.status(400).json({
            message: 'Пожалуйста, заполните обязательные поля'
        })
    }

    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    });
    const isPasswordCorrect = user && 
    (await brypt.compare(password, user.password));

    if (user && isPasswordCorrect) {
        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name
        })
    } else {
        return res.status(400).json({
            message: "Неверно введен логин или пароль"
        })
    }
}

const register = (req, res) => {
    res.send('register');
}

const current = (req, res) => {
    res.send('current');
}

module.exports = {
    login,
    register,
    current
}