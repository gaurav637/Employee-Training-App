const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const connectBD = require('./config/connectDB');
connectBD();
app.options('*', cors()); // Allow preflight requests for all routes
app.use(cors({
    origin: '*',
    credentials : true,
}));

app.use(express.json());
const router = require('./routes');
app.use('/api' ,router);

// app.use(cors({
//     origin: 'http://localhost:5000', // Allow requests from this origin
// }));
const PORT = process.env.PORT||8080;
app.listen(PORT , () => {
    console.log(`server running at port -> ${PORT}`);
});