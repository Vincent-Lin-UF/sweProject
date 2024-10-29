const express = require('express');
const router = express.Router();
const StravaApiV3 = require('strava-v3');

require('dotenv').config();

router.get('/', (req,res) => {
    res.send('API 🏃')
});

router.get('/test', (req,res) => {
    res.json({message: 'back be backing :)'});
});

router.get('/strava/activity/:id', (req, res) => {
    const activityId = req.params.id;

    const options = {
        id: activityId,
        access_token: process.env.STRAVA_ACCESS_TOKEN,
        includeAllEfforts: true
    };

    StravaApiV3.activities.get(options, (error, data) => {
        if (error) {
            console.error("fetchy fetch no worky work:", error);
            res.status(500).json({ message: 'fetchy fetch no worky work', error });
        } else {
            console.log("Strava W:", data);
            res.status(200).json({ message: 'Strava W', data });
        }
    });
});

module.exports = router;
