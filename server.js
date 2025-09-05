const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const personRoutes = require('./routes/persons');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/persons_db';

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// connect
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

app.use('/api/person', personRoutes);

app.get('/', (req, res) => res.json({ message: 'Persons API running' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
