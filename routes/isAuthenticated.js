module.exports = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({ SERVER_RESPONSE: 2, SERVER_MESSAGE: "Please, log in" });
}