const homePage = (req, res) => {
  res.render('home/index', {
    title: 'Homepage',
    message: 'Server Express.js đang chạy',
  });
};

module.exports = {
  homePage,
};
