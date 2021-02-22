// Ref. https://github.com/SBoudrias/Inquirer.js/ //

const inquirer = require('inquirer');

inquirer
 
    .prompt([
    // Questions to ask the user. //

    ])

    .then(answers => {
    // Use user feedback for... whatever!!
    })

    .catch(error => {

    if(error.isTtyError) {

        // Prompt couldn't be rendered in the current environment
    } else {
        
        // Something else went wrong
    }
    });