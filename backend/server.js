//ARQUIVO POR RODAR O SERVIDOR

//puxar dotenv
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: process.env.ENABLED_CORS?.split(';') || [], // Define os domínios permitidos em produção
  })
);

app.use(express.json());

//importando e usando rotas
const usuarioRouter = require('./src/routes/userRouter');
app.use('/user', usuarioRouter);

const trilhaRouter = require('./src/routes/trailRouter');
app.use('/trail', trilhaRouter);

const capituloRouter = require('./src/routes/chapterRouter');
app.use('/chapter', capituloRouter);

const quizRouter = require('./src/routes/quizRouter');
app.use('/quiz', quizRouter);

const progressRouter = require('./src/routes/progressRouter');
app.use('/progress', progressRouter);

//ativando servidor na porta 3001
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
