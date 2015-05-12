module.exports = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: "Please, log in" });
}