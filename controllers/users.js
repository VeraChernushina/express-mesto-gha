const User = require('../models/user');
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/utils');

// Получение пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователи на найдены.' });
        return;
      }
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(ERROR_INTERNAL_SERVER).send({ message: 'Внутренняя ошибка сервера.' });
    });
};
// Получение пользователя по его id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден.' });
        return;
      }
      res.status(200).send(user);
    })
    .catch(() => res.status(ERROR_BAD_REQUEST).send({ message: 'Внутренняя ошибка сервера.' }));
};
// Создание нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => res.status(ERROR_BAD_REQUEST).send({ message: 'Внутренняя ошибка сервера.' }));
};
// Обновление информации о пользователе
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(ERROR_BAD_REQUEST).send({ message: 'Внутренняя ошибка сервера.' }));
};
// Обновление аватара пользователя
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(ERROR_BAD_REQUEST).send({ message: 'Внутренняя ошибка сервера.' }));
};
