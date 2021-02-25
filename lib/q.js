// Prompts were Ref. https://github.com/SBoudrias/Inquirer.js/; but I chose an easier method. //
const inquirer = require('inquirer');
const emailValidator = require('email-validator');
const {Validator} = require('node-input-validator');
const phone = require('phone');


// Questions to ask the user. //
class userInquiries {

    constructor(role) {

        this.questions = [

            

            
        ],

        this.role = role
    }

    nextQuery(question) {

        this.questions.splice(5, 0, question)
    };

    nextQuery() {

        return inquirer.prompt(response.questions)
    }
};