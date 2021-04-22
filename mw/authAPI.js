// const db = require('../db');

const authMw = {
    isAuth: (req, res, next) => {
        if (!req.session.user) {
            return res.status(403).send({});
        }

        next();
    },

    isAuthUser: (types) => {
        return (req, res, next) => {
            if (!(req.session.user.type in types)) {
                return res.status(403).send({});
            }

            next();
        };
    },

    isNotAuth: (req, res, next) => {
        if (req.session.user) {
            return res.status(403).send({});
        }

        next();
    },
};

module.exports = authMw;