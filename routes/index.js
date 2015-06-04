var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ mensaje: "HOLA" });
});

router.post('/', function(req, res) {
    res.json({ mensaje: "POST" });
    console.log(req.body);
});

module.exports = router;