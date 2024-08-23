const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const connectBD = require('./config/connectDB');
connectBD();
app.use(express.json());
const router = require('./routes');
app.use('/api' ,router);
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials : true,
}));
const PORT = process.env.PORT||8080;
app.listen(PORT , () => {
    console.log(`server running at port -> ${PORT}`);
});