// Ref. https://github.com/SBoudrias/Inquirer.js/ //

const inquirer = require('inquirer');
const emailValidator = require('email-validator');

// Questions to ask the user. //
class userInquiries {

    constructor(role) {

        this.questions = [

            {
                type: 'input',
                name: 'name',
                message: `What ${this.role} do you wish to add?`,

                validate: function (value) {

                    // Ref. https://github.com/supercodingninja/passwordGenerator/blob/main/pw.js, and see if there is an easier way to write this. // 
                    var pass = value.match('~!@#$%^&*?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWUXYZ'.split(''));

                    if (pass) { return true }
                    return `A valid name does not include integers or special characters.`;
                }
            },

            {
                type: 'input',
                name: 'id',
                message: `State ${this.role} ID number?`,
                validate: function (value) {
                    var pass = value.match('~!@#$%^&*?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWUXYZ'.split(''));
                    if (pass) { return true }
                    return `Please enter a valid employee ID number`
                }
            },

            {
                type: 'input',
                name: 'email',
                message: `What is the email address for this ${this.role}?`,
                validate: emailValidator
            },

            {
                type: 'list',
                name: 'addMember',
                message: `Select which team member you would like to add.`,
                choices: ['Engineer', 'Intern', 'Employee', 'No more.']
            }
        ]
        
        this.role = role



    }
    nextQuery(question) {

        this.questions.splice(3, 0, question)
    };

    nextQuery() {

        return inquirer.prompt(this.questions)
    }

};