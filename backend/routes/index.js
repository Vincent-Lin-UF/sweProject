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


    /* Auth related routes */
    router.post(
      '/api/users/login',
      passport.authenticate("local"),
      (req, res) => {
          res.json({success: true});
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

    router.post('/api/users/logout', (req, res) => {
        req.logout();
        res.send({ status: 'Logged out' });
    });

    router.get('/api/users/status', (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).json({ isAuthenticated: true, user: req.user });
        } else {
            res.status(200).json({ isAuthenticated: false, message: 'User not authenticated' });
        }
    });

    async function handle_run(req, res, body) {
        let client = req.pgClient;
        try {
            const qr = await client.query('INSERT INTO runs(email, run_date, distance, duration) values($1::text, $2::date, $3::real, $4::real)', [req.user.email, body.date, body.distance, body.duration]);
            console.log(qr);
            res.status(200).json({message: "Successfully logged workout"});
        } catch (e) {
            res.status(400).json({message: "Probably invalid email"});
        }
    }

    const workout_handlers = {
        Running: handle_run,
    };

    /* Data routes */
    router.post('/api/data/log-workout', async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(401).json({message: 'Authenticated yourself, you nincompoop'})
            return;
        }

        /*
CREATE TABLE Runs (email text REFERENCES users(email), run_id INT GENERATED ALWAYS AS IDENTITY, run_date date, distance real, duration real, PRIMARY KEY(email, run_id));
        * */

        let body = req.body;
        if (!('workout' in body)) {
            res.status(400).json({message: "No workout field in request"});
            return;
        }

        let workout = body['workout'];
        if (!(workout in workout_handlers)) {
            res.status(400).json({message: "Invalid workout"});
            return;
        }

        let handler = workout_handlers[workout];
        handler(req, res, body);
    });

    async function handle_run_data(req, res) {
        let client = req.pgClient;
        try {
            const qr = await client.query('SELECT * FROM Runs WHERE email = $1::text', [req.user.email]);
            console.log(qr);
            res.status(200).json({data: qr.rows});
        } catch (e) {
            res.status(400).json({message: "Probably invalid email"});
        }
    }

    const get_data_handlers = {
        Running: handle_run_data,

    }

    router.get('/api/data/get-workouts', async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(401).json({message: 'Authenticated yourself, you nincompoop'})
            return;
        }

        if (!('workout' in req.query)) {
            res.status(400).json({message: 'invalid request'});
            return;
        }

        let workout = req.query.workout;
        if (!(workout in get_data_handlers)) {
            res.status(400).json({message: 'invalid request'});
            return;
        }

        get_data_handlers[workout](req, res);
    })

    return router;
}


