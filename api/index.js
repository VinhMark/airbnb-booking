require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGO_URL);

const User = require('./models/User');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdhasjdaldh88789789';

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.get('/test', (req, res) => {
  res.json('test pl');
});

app.post('/register', async (req, res) => {
  try {
    const user = req.body;
    const userDoc = await User.create({
      ...user,
      password: bcrypt.hashSync(user.password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });
  console.log(userDoc);
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        }
      );
    } else {
      res.status(422).json('Password is not matched.');
    }
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.listen(4000);
