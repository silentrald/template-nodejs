const hbs       = require('handlebars');
const fs        = require('fs');
// const fsPromise = fs.promises;
const path      = require('path');
const getFiles  = require('./getFiles');

const parentDir = path.dirname(__dirname);

const templates = {};

for (const file of getFiles(path.join(parentDir, 'views'))) {
    file.startsWith('partials/')
        ? hbs.registerPartial(file.slice(9, -4), fs.readFileSync(path.join(parentDir, 'views', file), { encoding: 'utf-8' }))
        : templates[file.slice(0, -4)] = fs.readFileSync(path.join(parentDir, 'views', file), { encoding: 'utf-8' });
}

module.exports = (req, res, next) => {
    res.render = async (view, data) => {
        const { layout } = data;
        delete data.layout;

        const layoutTemplate = hbs.compile(templates[`layouts/${layout ? layout : 'main'}`]);
        const viewTemplate = hbs.compile(templates[view]);

        const body = viewTemplate(data);

        const html = layoutTemplate({
            body,
            ...data,
            csrfToken: req.csrfToken()
        });

        return res.send(html);
    };
    next();
};