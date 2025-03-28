const getHome = (req, res) => {
  res.render('client/pages/home.pug', {
    pageTitle: 'Trang chủ',
  });
};

module.exports = { getHome };
