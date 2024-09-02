const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.get('/users', async (req, res) => {
    console.log("Rota de listagem de usuários acessada");
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
})

router.post('/register', async (req, res) => {
    console.log("Rota de registro acessada");
    const { email, password } = req.body;
    try {
        console.log("Iniciando processo de registro");
        let user = await User.findOne({ email });
        if (user) {
            console.log("Usuário já existe");
            return res.status(400).json({ error: 'Este email está em uso' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({ email, password: hashedPassword });
        await user.save();
        console.log("Usuário registrado com sucesso");
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
})

router.post('/login', async (req, res) => {
    console.log("Rota de login acessada");
    const { email, password } = req.body;
    try {
        console.log("Iniciando processo de login");
        const user = await User.findOne({ email });
        if (!user) {
            console.log("Usuário não encontrado");
            return res.status(400).json({ error: 'Credenciais inválidas' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Senha inválida");
            return res.status(400).json({ error: 'Credenciais inválidas' });
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
})

module.exports = router