const bcrypt    = require('bcrypt');
const db        = require('../../../db');

const ctrl = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const queryUser = {
            text: `
                SELECT  *
                FROM    users
                WHERE   username = $1
                LIMIT   1;
            `,
            values: [ username ]
        };

        const { rows: users, rowCount: userCount } = await db.query(queryUser);
        if (userCount === 0) {
            return res.status(403).send({});
        }

        const user = users[0];

        const validate = bcrypt.compare(password, user.password);
        if (!validate) {
            return res.status(403).send({});
        }

        delete user.password;
        req.session.user = user;

        console.log(req.session);

        return res.status(200).send({});
    } catch (err) {
        console.log(err);

        return res.status(500).send({});
    }
};

module.exports = [
    ctrl
];