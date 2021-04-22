const fs = require('fs');
const path = require('path');

const getFiles = (dir) => {
    let files = [];

    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const { name } = dirent;
        if (dirent.isDirectory()) {
            const temp = getFiles(path.join(dir, name));
            if (temp.length > 0) {
                files.push(...temp.map(file => path.join(dirent.name, file)));
            }
        } else {
            files.push(name);
        }
    }

    return files;
};

module.exports = getFiles;