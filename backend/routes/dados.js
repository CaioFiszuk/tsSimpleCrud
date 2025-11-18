const router = require('express').Router();
const { createDado, getDados, deleteDado, updateDado } = require('../controllers/dados');

router.post('/', createDado);
router.get('/', getDados);
router.delete('/:dadosId', deleteDado);
router.patch('/:dadosId', updateDado);

module.exports = router;