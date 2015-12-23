var express = require('express');
var router = express.Router();
var quesController = require('../controllers/question');
/* GET users listing. */
router.get('/', quesController.list);
router.get('/:query', quesController.get);
router.delete('/:id', quesController.delete);
router.post('/', quesController.add);
router.put('/', quesController.update);

module.exports = router;
