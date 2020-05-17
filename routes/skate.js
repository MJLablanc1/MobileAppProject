var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 // res.send('Hellos from the Get call to the server from the user route');
  res.render('skategear' ,{ title: 'SkateGear!'} )
});

module.exports = router;
