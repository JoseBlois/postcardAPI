module.exports = function postcardsController(Postcard) {
  function post(req, res) {
    const postcard = new Postcard(req.body);
    postcard.save();
    return res.sendStatus(201);
  }
  function get(req, res) {
    const query = {};
    if (req.query.rating) {
      query.rating = req.query.rating;
    }
    Postcard.find(query, (err, postcards) => {
      if (err) {
        return res.send(err);
      }
      return res.render('postcardsView', { postcards });
    });
  }
  return {
    get,
    post,
  };
};
