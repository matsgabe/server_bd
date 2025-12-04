const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.registrar = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const usuarioExistente = await Usuario.findOne({ 
            where: { username } 
        });

        if (usuarioExistente) {
            return res.status(400).json({ erro: 'Usuário já existe.' });
        }

        const usuario = await Usuario.create({ username, password, email });

        const token = jwt.sign(
            { id: usuario.id, username: usuario.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            mensagem: 'Usuário criado com sucesso!',
            token,
            usuario: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const usuario = await Usuario.findOne({ where: { username } });

        if (!usuario) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' });
        }

        const senhaValida = await usuario.validarSenha(password);

        if (!senhaValida) {
            return res.status(401).json({ erro: 'Credenciais inválidas.' });
        }

        const token = jwt.sign(
            { id: usuario.id, username: usuario.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            mensagem: 'Login realizado com sucesso!',
            token,
            usuario: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};