const authMw = require('../../mw/authCtrl');

const ctrl = (req, res) => {
    return res.render('index', {
        title: 'USG Document Tracker'
    });
};

module.exports = [
    authMw.isAuth,
    ctrl
];