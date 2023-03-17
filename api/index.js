require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

mongoose.connect(process.env.MONGO_URL);

const User = require('./models/User');
const Place = require('./models/Place');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdhasjdaldh88789789';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
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
  } else {
    res.json('Not found');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo-' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });

  res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photo', 100), (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const newPath = path + '.' + parts[parts.length - 1];
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadFiles);
});

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owr: user.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });

      res.json(placeDoc);
    });
  }
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;

    res.json(await Place.find({ owr: id }));
  });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await Place.findById(id));
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put('/places', async (req, res) => {
  const { id, ...place } = req.body;
  console.log(id);
  const { token } = req.cookies;
  try {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if (placeDoc.owr.toString() === userData.id) {
        placeDoc.set({ ...place, photos: place.addedPhotos });
        placeDoc.save();
        res.json('oke');
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post('/remove-image', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const userDoc = await User.findById(user.id);
    if (userDoc) {
      const photo = req.body;
      photo.forEach((i) => {
        fs.unlinkSync(__dirname + '/uploads/' + i, (err) => {
          if (err) throw err;
        });
      });
      res.json('file deleted');
    }
  });
});

// Index get places
app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

app.listen(4000);
