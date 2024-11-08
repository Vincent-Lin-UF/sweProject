const passport = require('passport');

const express = require('express');
const crypto = require("crypto");
const router = express.Router();

module.exports = (passport) => {
    router.get('/api', (req,res) => {
        res.send('API 🏃')
    });

    router.get('/api/test', (req,res) => {
        res.json({message: 'back be backing :)'});
    });

    router.post(
        '/api/users/login',
        passport.authenticate("local"),
        (req, res) => {
            res.json(req.user);
            res.status(200)
        }
    );

    function generateSalt(length = 16) {
        return crypto.randomBytes(length).toString('hex');
    }

    router.post('/api/users/register', async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const pass = req.body.password;

        let client = req.pgClient;

        const qr = await client.query('SELECT * FROM users WHERE email = $1::text', [email]);
        if (qr.rows.length !== 0) {
            res.json({message: 'Email already in use'});
            return;
        }

        const salt = generateSalt(32)
        const hashed_pword = crypto.pbkdf2Sync(pass, salt, 310000, 32, 'sha256').toString('hex');

        await client.query('INSERT INTO users VALUES($1::text, $2::text, $3::text, $4::text)', [email, name, hashed_pword, salt]);
    })

    router.post('/logout', (req, res) => {
        req.logout();
        res.send({ status: 'Logged out' });
    });

    return router;
}


