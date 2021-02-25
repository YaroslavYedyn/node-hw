const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, 'time');
console.log(dirPath);

function readDir(pathName) {
    fs.readdir(pathName, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach((fileName) => {
            const pathFile = path.join(pathName, fileName);

            fs.stat(pathFile, (err1, stats) => {
                if (err1) {
                    console.log(err1);
                    return;
                }
                if (stats.isDirectory()) {
                    return readDir(pathFile);
                }
                const newPath = path.join(__dirname, 'time', fileName);
                fs.rename(pathFile, newPath, (err2) => {
                    if (err2) {
                        console.log(err2);
                    }
                });
            });
        });
    });
}

readDir(dirPath);
