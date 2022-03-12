const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { ERROR_NOT_FOUND } = require("./utils/utils");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "621d46ec4532f6df2e3f2aa5",
  };

  next();
});

app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));

app.use((req, res) =>
  res.status(ERROR_NOT_FOUND).send({ message: "Страница не найдена" })
);

app.listen(PORT);
