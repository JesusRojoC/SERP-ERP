const router = require('express').Router();

const customerController = require('../controllers/customerController');

router.get('/customers', customerController.list);
router.post('/add', customerController.save);
router.get('/update/:id', customerController.edit);
router.post('/update/:id', customerController.update);
router.get('/delete/:id', customerController.delete);
router.get('/', customerController.index);
router.get('/products', customerController.products);
module.exports = router;

