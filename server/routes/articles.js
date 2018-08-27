var express = require('express');
var router = express.Router();
const { addArticle, List, Detail, DeleteArticle, Update } = require('../controllers/article.js')
const { Auth } = require('../middleware/auth')
const { addComment, deleteComment } = require('../controllers/comment')

router.post('/add', Auth, addArticle); //done
router.get('/',List) //done 
router.post('/:id/addcomment', Auth, addComment) //done
router.get('/detail/:id',Detail) // done
router.delete('/:id/deletecomment/:idcom', Auth, deleteComment) //done
router.put('/update/:id', Auth, Update) //done
router.delete('/delete/:id', Auth, DeleteArticle) //done
module.exports = router;