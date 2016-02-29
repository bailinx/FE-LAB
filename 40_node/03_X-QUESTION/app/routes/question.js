var express = require('express');
var router = express.Router();
var quesController = require('../controllers/question');
// 导出cvs
router.get('/export', quesController.export);
/* GET users listing. */
router.get('/list', quesController.list);
router.get('/:query', quesController.get);
router.delete('/:id', quesController.delete);
router.post('/', quesController.add);
router.put('/', quesController.update);


module.exports = router;
