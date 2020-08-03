const generateBadges = (license) => {
  if (!license) {
    return '';
  }
  
  license = license
    .replace(' ', '_')
    .replace(' ', '_')

  return `
![license](https://img.shields.io/badge/License-${license}-blue)
`
}

const generateDescription = (description) => {
  if (!description) {
    return '';
  }

  return `
<a name='description'></a>
## Description
${description}
`
}

const generateToC = (sections) => {
  let text = `
## Table of Contents
`

  sections.filter(item => {
    if (item !== 'Table of Contents') return item;
  })
    .forEach(item => {
      text += `* [${item}](#${item})\n`
    });

  return text
}

const generateInstallation = (installation) => {
  if (!installation) {
    return '';
  }

  return `
<a name='installation'></a>
## Installation
${installation}
`
}

const generateUsage = (usage) => {
  if (!usage) {
    return '';
  }

  return `
<a name='usage'></a>
## Usage
${usage}
`
}

const generateLicense = (license) => {
  if (!license) {
    return '';
  }

  return `
<a name='license'></a>
## License
Licensed under the [${license}](./LICENSE.txt) license.
`
}

const generateContributing = (contributingSelect, contributing) => {
  if (!contributingSelect) {
    return '';
  }

  let text = `
<a name='contributing'></a>
## Contributing
`
  if (contributing) {

    return text += contributing + '\n';

  } else {
    return text += '[Contributor Covenant](./contributor-covenant.txt)\n';
  }
}

const generateTests = (tests) => {
  if (!tests) {
    return ''
  }

  return `
<a name='tests'></a>
## Tests
${tests}
`
}

const generateQuestions = (questions) => {
  const { contact, github, email } = questions;

  if (!contact & !github & !email) {
    return ''
  }

  let text = `
<a name='questions'></a>
## Questions
`

  if (contact) {
    text += contact + '\n\n'
  }

  if (github) {
    text += `${github}'s [GitHub](https://github.com/${github})\n\n`
  }

  if (email) {
    text += `Email me at <${email}>`
  }

  return text;
}

// function to generate markdown for README
function generateMarkdown(templateData) {
  // deconstruction of data
  const { title, sections, description, installation, usage, license, contributingSelect, contributing, tests, ...questions } = templateData;

  let markdown = '# ' + title +
    generateBadges(license) +
    generateDescription(description) +
    generateToC(sections) +
    generateInstallation(installation) +
    generateUsage(usage) +
    generateLicense(license) +
    generateContributing(contributingSelect, contributing) +
    generateTests(tests) +
    generateQuestions(questions)

  return markdown.split('\\n').join(`
`)
}

module.exports = generateMarkdown;