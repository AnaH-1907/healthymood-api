const genericPagesController = require('../controllers/generic_page.controller.js');
const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth.js');
const requireAdmin = require('../middlewares/requireAdmin.js');

router.post('/', requireAuth, requireAdmin, genericPagesController.create);
router.get('/', genericPagesController.findAll);
router.get('/:id', genericPagesController.findOne);
router.patch('/:id', requireAuth, requireAdmin, genericPagesController.update);
router.delete('/:id', requireAuth, requireAdmin, genericPagesController.delete);

module.exports = router;
