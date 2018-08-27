var express = require('express');
var router = express.Router();
const {addUser, Login} = require('../controllers/user.js')
const {Upload} = require('../controllers/article.js')
const images = require('../helpers/images')
const { Auth, AuthUser} = require('../middleware/auth')




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', addUser) //done
router.post('/login', Login) //done
router.post('/upload', Auth, images.multer.single('image'), images.sendUploadToGCS, Upload) //done


module.exports = router;
