const fs        = require('fs');
const getFiles  = require('./getFiles');
const uglify    = require('uglify-js');
const path      = require('path');

const parentDir = path.dirname(__dirname);

for (const file of getFiles(path.join(parentDir, 'static/js'))) {
    const js = fs.readFileSync(path.join(parentDir, 'static/js', file), { encoding: 'utf-8' });
    const { code } = uglify.minify(js);
    fs.writeFileSync(path.join(parentDir, 'dist/js', file), code);
}
