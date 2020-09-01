module.exports = function admin(Postcard) {
  function get(req, res) {
    const postcard = new Postcard({
      title: 'Empire State',
      description: 'I really liked the view from the top',
      rating: 8,
      image: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2017/10/263701-origenes-curiosidades-gran-muralla-china.jpg',
    });
    postcard.save();
    res.json(postcard);
  }

  return { get };
};
