const express = require('express');
const router = express.Router();
const { getData, getKpis, getAnalytics, getFilters } = require('../controllers/dataController');

router.get('/', getData);
router.get('/kpis', getKpis);
router.get('/analytics', getAnalytics);
router.get('/filters', getFilters);

module.exports = router;
