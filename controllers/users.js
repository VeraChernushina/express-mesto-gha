const bcrypt = require("bcryptjs");
const user = require("../models/user");
const User = require("../models/user");

const { ERROR_NOT_FOUND, errorsHandler } = require("../utils/utils");

// Получение пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => errorsHandler(err, res));
};

// Получение пользователя по его id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => errorsHandler(err, res));
};

// Создание нового пользователя
module.exports.createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      return User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
      });
    })
    .then((user) => {
      return res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => errorsHandler(err, res));
};

// Обновление информации о пользователе
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => errorsHandler(err, res));
};

// Обновление аватара пользователя
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => errorsHandler(err, res));
};
