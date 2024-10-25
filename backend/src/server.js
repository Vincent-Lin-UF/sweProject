const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to the Mango🥭');
        app.listen(PORT, () => {
            console.log(`Server be running on ${PORT} no CAP 🙅`);
        });
    })
    .catch((error) => {
        console.error('Oopsie daisy seems like Mango be issuing 😭:', error);
});
