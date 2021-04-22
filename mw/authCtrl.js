// const db = require('../db');

const authMw = {
    isAuth: (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        next();
    },

    isAuthUser: (types) => {
        return (req, res, next) => {
            if (!(req.session.user.type in types)) {
                return res.redirect('/');
            }

            next();
        };
    },

    isNotAuth: (req, res, next) => {
        if (req.session.user) {
            return res.redirect('/');
        }

        next();
    },
};

module.exports = authMw;