app.get('/Api/v1/SignOut/:UserName/:SignOutKey', function (req, res) {
  let UserName = req.params.UserName;
  let Password = req.params.SignOutKey;

  if (!isNullOrEmpty(UserName) &&
    !isNullOrEmpty(SignOutKey)) {

    res.send('test login');
  } else {
    res.send('no params sent');
  }
});