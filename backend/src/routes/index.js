const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('API 🏃')
});

router.get('/test', (req,res) => {
    res.json({message: 'back be backing :)'});
});

module.exports = router;