const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/stats', async (req, res) => {
    res.render('stats');
});

router.get('/exercise', async (req, res) => {
    res.render('exercise');
});



module.exports = router;