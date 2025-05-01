const express = require('express');
const app = express();
const routes = require('./routes/queueRoutes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(3000, () => console.log('Сервер запущено на порту 3000'));
