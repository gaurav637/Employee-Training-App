const express = require('express');
require('dotenv').config();
const app = express();
const connectBD = require('./config/connectDB');
connectBD();
// const router = require('./routes');
// app.use('/api' ,router);
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials : true,
}));
const PORT = process.env.PORT||8080;
app.listen(PORT , () => {
    console.log(`server running at port -> ${PORT}`);
});// TrainingHub