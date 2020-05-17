var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 // res.send('Hellos from the Get call to the server from the user route');
  res.render('flowershop' ,{ title: 'lies'} )
});

/* GET users listing. */
router.get('/help', function(req, res, next) {
  // res.send('Hellos from the Get call to the server from the user route');
   res.render('flowershophelp' ,{ title: 'HELP'} )
 });

 /* GET users listing. */
router.get('/registar', function(req, res, next) {
  // res.send('Hellos from the Get call to the server from the user route');
   res.render('flowershopresgitar' ,{ title: 'Resgistartion'} )
 })

module.exports = router;
