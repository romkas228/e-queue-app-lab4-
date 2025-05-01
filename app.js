const express = require("express");
const app = express();
const routes = require("./routes/queueRoutes");
const repo = require("./repositories/queueRepository");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

repo.loadQueuesSync();

app.use("/", routes);

app.listen(3000, () => console.log("Сервер запущено на порту 3000"));