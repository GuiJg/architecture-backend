require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const projectRoute = require('./routes/projectRoute');
const userRoute = require('./routes/userRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const API_URL = process.env.API_URL

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);
app.use(authMiddleware);

//projetos rota
app.use('/api/project', projectRoute);

//usuarios rota
app.use('/api/user', userRoute);

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor está rodando na porta ${PORT}`);       
            console.log('API:', API_URL);
        })
        app.get('/', (req, res) => {
            res.send('Servidor conectado ao MongoDB');
        })
    })
    .catch((err) => {
        console.log(err);
    })