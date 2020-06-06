require('dotenv').config();

express = require('express');
const app = express();


//? DATABASE CONNECTION
const mongoose = require('mongoose');
mongoose.connect( process.env.DB_URL , {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//? IMPORT ROUTES
const recipesRouter = require('./routes/recipes');


//? MIDDLEWEARS
app.use(express.json());
app.use('/recipes', recipesRouter);


//? ROUTES
app.get('/', (req, res) => {
    res.send('We are on home route');
});


//? APP RUNNING
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});