//const express = require('express')
//const cors = require('cors')

// const AppError = require('./utils/appError');
// const userRouter = require('./routes/userRoutes');
// const profRouter = require('./routes/profRoutes')
// const globalErrorHandler = require('./controllers/errorController');

// const app = express();

// app.use(express.json())
// app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Origin', req.headers.origin);   
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, PUT, OPTIONS")
//     next();
// })


// app.use('/user', userRouter);
// app.use('/professor', profRouter);

// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);


// module.exports = app;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const profRouter = require('./routes/profRoutes');
const globalErrorHandler = require('./controllers/errorController');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const DB = process.env.DATABASE.replace(
    '<mongodbbda>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB connection successful!'))
  .catch(err => console.error('DB connection error:', err));

// Routes
app.use('/user', userRouter);
app.use('/professor', profRouter);

// Handle undefined routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling
app.use(globalErrorHandler);

module.exports = app;
