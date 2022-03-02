const Card = require('../models/card');
const {
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточки не найдены.' });
        return;
      }
      res.status(200).send(cards);
    })
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'Внутренняя ошибка сервера.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'Внутренняя ошибка сервера.' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена.' });
        return;
      }
      res.status(200).send(card);
    })
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'Внутренняя ошибка сервера.' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'Внутренняя ошибка сервера.' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'Внутренняя ошибка сервера.' }));
};
