const express = require('express');
const postcardController = require('../controllers/postcardController');
const adminController = require('../controllers/adminController');

module.exports = function router(Postcard) {
  const controller = postcardController(Postcard);
  const controllerAdmin = adminController(Postcard);

  const postcardsRouter = express.Router();

  postcardsRouter.route('/postcards')
    .post(controller.post)
    .get(controller.get);
  postcardsRouter.use('/postcards/:id', (req, res, next) => {
    Postcard.findById(req.params.id, (err, postcard) => {
      if (err) {
        return res.send(err);
      }
      if (postcard) {
        req.postcard = postcard;
        return next();
      }
      return res.sendStatus(404).send('Not found');
    });
  });
  postcardsRouter.route('/postcards/:id')
    .get((req, res) => {
      res.json(req.postcard);
    })
    .put((req, res) => {
      const { postcard } = req;
      postcard.title = req.body.title;
      postcard.description = req.body.description;
      postcard.rating = req.body.rating;
      postcard.image = req.body.image;
      postcard.save();
      return res.json(postcard);
    })
    .delete((req, res) => {
      req.postcard.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  postcardsRouter.route('/admin')
    .get(controllerAdmin.get);
  return postcardsRouter;
};
