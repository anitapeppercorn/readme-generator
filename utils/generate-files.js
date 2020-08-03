const fs = require('fs');

// function to write README file
function writeFile(markdown) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', markdown, err => {
            if (err) {
                reject(err);
                return;
            };

            resolve({
                ok: true,
                message: 'ReadMe successfully created! Find your copy in the distribution folder (/dist)'
            });
        });
    });
}

//copy LICENSE and Contributor Covenant READMEs.
const copyLicense = (license) => {
    license = license
        .replace(' ', '-')
        .replace(' ', '-')
        .replace('/', '-')
    return new Promise((resolve, reject) => {
        fs.copyFile(`./src/licenses/${license}.txt`, './dist/LICENSE.txt', err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'License copied! Find in folder (/dist)'
            });
        })
    });
};

const copyContributorCovenant = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/contributor-covenant.txt', './dist/contributor-covenant.txt', err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'Contributor Covenant copied! Find in folder (/dist)'
            });
        })
    });
};

module.exports = { writeFile, copyLicense, copyContributorCovenant }