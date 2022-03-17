const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const accountRoute = require('./routes/accountRoute');
const groupRoute = require('./routes/groupRoute');
const billRoute = require('./routes/billRoute');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes
app.use('/auth/', authRoutes);
app.use('/accounts/', accountRoute);
app.use('/groups/', groupRoute);
app.use('/bills/', billRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// node -> require('crypto').randomBytes(64).toString('hex')
