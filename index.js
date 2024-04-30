// index.js
const express = require('express');
// const bodyParser = require('body-parser'); // deprecated - usar express.json()
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/users', async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'username'] });
  res.json(users);
});

app.get('/profile', async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({
    where: { username: username ?? null },
    attributes: ['id', 'username']
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
