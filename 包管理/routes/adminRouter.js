const express = require('express')
const router = express.Router()

router.get('/setting', (req, res) => {
    res.send('设置页面')
})
router.get('/admin', (req, res) => {
    res.send('后台首页');
});
router.get('/login', (req, res) => {
    res.send('表单页面')
})
module.exports = router