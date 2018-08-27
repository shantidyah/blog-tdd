var express = require('express');
var router = express.Router();
const { addArticle } = require('../controllers/article.js')
const { Auth, AuthUser} = require('../middleware/auth')


module.exports = router;
