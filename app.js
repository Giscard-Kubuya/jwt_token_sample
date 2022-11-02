require('dotenv').config();
const express = require('express');
const Model = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!(username && email && password)) {
            res.status(400).send({ message: 'All inputs are required' });
        }

        const oldUser = Model.findOne({ email });
        if (oldUser) {
            res.status(409).send({ message: 'User already exists' });
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        let dataBody = {
            username,
            email: email.toLowerCase(),
            password: encryptedPassword
        };
        const user = await Model.create(dataBody, dt = (result) => {
            dataBody.id = result.insertId;
            const token = jwt.sign(
                {
                    id: dataBody.id, email
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h'
                }

            );

            dataBody.token = token;

            res.status(201).send(dataBody);
        });


    } catch (e) {
        console.log(e)
    }

});

app.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send({ message: 'All inputs are required' });
        }

        Model.findOne({ email }, (err, result) => {
            if (result && (bcrypt.compare(password, result.password))) {
                const token = jwt.sign(
                    {
                        id: result.id, email: result.email
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: '2h',
                    }
                );
                result.token = token;
                res.status(200).send(result);
            }
            else {
                res.status(400).send({ message: 'Invalid Credentials' });
            }
        });

    } catch (e) {
        console.log(e)
    }

});

app.get('/welcome',auth,(req,res)=>{
    res.status(200).send('Welcome guys 🤑');
})

module.exports = app;