const express = require('express');
const app = express();
const port = 3000;

app.use(require('cors')());

const mongoose = require('mongoose');
const { User } = require('./schema');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('Connected to MongoDB');
        }).catch((e) => {
            console.log('Error connecting to MongoDB');
        });
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
    }
})();


app.post('/register', async (req, res) => {
    try {

        let user = await User.create(req.body);
        res.status(201).send(user);

    } catch (error) {

        res.status(500).send(error);
    }
})

app.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        let user = await User.findOne({ username: username, password: password });
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).send('User not found');
        }

    } catch (error) {

        res.status(500).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});





app.listen(port, () => {
    console.log('server is up and running on port numner ' + port);
})