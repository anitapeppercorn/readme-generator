const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generate-markdown')
const { writeFile, copyLicense, copyContributorCovenant } = require('./utils/generate-files')

// questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is your project title? (Required)',
        validate: input => {
            if (input) {
                return true;
            } else {
                console.log('Please enter a value!');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'sections',
        message: 'What sections do you wish to include? (check all to be included)',
        choices: ['Description', 'Table of Contents', 'Installation', 'Usage', 'License', 'Contributing', 'Tests', 'Questions']
    },
    {
        type: 'input',
        name: 'description',
        message: `
       use \\n for line breaks.
     
        ` + '\nWhat is your project description?\n\n',
        when: ({ sections }) => sections.includes('Description')
    },
    {
        type: 'input',
        name: 'installation',
        message: `
        use \\n for line breaks.
        ` + '\nHow would one install your project?\n\n',
        when: ({ sections }) => sections.includes('Installation')
    },
    {
        type: 'input',
        name: 'usage',
        message: `
        use \\n for line breaks.
        ` + '\nHow would one use your project?\n\n',
        when: ({ sections }) => sections.includes('Usage')
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license does your project use?',
        choices: ['ISC', 'GNU AGPLv3', 'Apache 2.0', 'MIT'],
        when: ({ sections }) => sections.includes('License')
    },
    {
        type: 'list',
        name: 'contributingSelect',
        message: 'Use the Contributor Covenant or create your own?',
        choices: ['Contributor Covenant', 'Create your own'],
        when: ({ sections }) => sections.includes('Contributing')
    },
    {
        type: 'input',
        name: 'contributing',
        message: `
        use \\n for line breaks.
        ` + '\nWhat guidelines shoule others follow when contributing to your project?\n\n',
        when: ({ contributingSelect }) => {
            if (contributingSelect) {
                return contributingSelect.includes('Create your own')
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: `
        use \\n for line breaks.
        ` + '\nWhat tests would you like to add?\n\n',
        when: ({ sections }) => sections.includes('Tests')
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
        when: ({ sections }) => sections.includes('Questions')
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        when: ({ sections }) => sections.includes('Questions')
    },
    {
        type: 'input',
        name: 'contact',
        message: `
        use \\n for line breaks.
        ` + '\nHow should others reach you if they have questions?\n\n',
        when: ({ sections }) => sections.includes('Questions')
    },
];

// function to initialize program
function init() {
    let license, contributingSelect;

    inquirer
        .prompt(questions)
        .then(answers => {
            license = answers.license
            contributingSelect = answers.contributingSelect
            return generateMarkdown(answers);
        })
        .then(markdown => {
            return writeFile(markdown);
        })
        .then((writeFileResponse) => {
            console.log(writeFileResponse);
            if (license) {
                return copyLicense(license);
            } else {
                return '';
            }
        })
        .then((copyLicenseResponse) => {
            console.log(copyLicenseResponse);
            if (contributingSelect === 'Contributor Covenant') {
                return copyContributorCovenant();
            } else {
                return '';
            }
        })
        .then((copyContributorCovenantResponse) => {
            console.log(copyContributorCovenantResponse)
        })
        .catch(err => {
            console.log(err);
        });
}

init();