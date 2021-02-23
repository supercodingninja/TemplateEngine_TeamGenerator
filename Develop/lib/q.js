// Prompts were Ref. https://github.com/SBoudrias/Inquirer.js/; but I chose an easier method. //

const inquirer = require('inquirer');
const emailValidator = require('email-validator');
const { Validator } = require('node-input-validator');
const phone = require('phone');

// Questions to ask the user. //
class userInquiries {

    constructor(role) {

        this.questions = [

            {
                type: 'list',
                
                name: 'name',

                message: `What ${this.role} do you wish to add?`,
                
                choices: ['Intern', 'Employee', 'Engineer', 'Manager']

            },
            
            {
                type: 'input',
                
                name: 'id',

                    validate: function (value) {

                        // Ref. https://www.npmjs.com/package/node-input-validator //
                        var pass = value.match('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWUXYZ'.split(''));
                        
                        if (pass) { return true };
                        
                        return `Please enter a valid employee ID number`
                    },
                
                message: `State ${this.role} ID number?`
            },

            {
                type: 'input',
                
                name: 'email',
                
                    // Ref. https://www.npmjs.com/package/email-validator //
                    validate: emailValidator,
                
                message: `What is the email address for this ${this.role}?`,
            },

            {
                type: 'list',
                
                name: 'memStat',
                
                message: `Select which team member you would like to add.`,
                
                choices: ['No additional members.', 'Intern', 'Employee', 'Engineer', 'Manager']
            }
        ],

        this.role = role
    }

    nextQuery(question) {

        this.questions.splice(5, 0, question)
    };

    nextQuery() {

        return inquirer.prompt(this.questions)
    }
};


// Some roles will have different requirements.  Below is a simplified method, rather than using long conditional statements. //
const intQ = [
    
    {
        type:'list',
        
        name:'GitHub',
        
        message:'Does the intern have a GitHub profile?',

        choices: ['No.','Yes.' = [
            
                {
                    type: 'input',
                        
                    name: 'name',
                        validate: function (value) {

                            // Ref. https://www.npmjs.com/package/node-input-validator //
                            var pass = value.match(Validator);
                            
                            if (pass) {return true};
                            
                            return `Please enter a valid user name.`
                        },

                    message: `Please enter the GitHub user name for the intern.`
                }
            ]
        ]
    },

    {
        type:'list',
        
        name:'GitHub',
        
        message:'Does the intern attend an university?',

        choices: ['No.','Yes.' = [
                
                {
            
                    type: 'input',
                        
                    name: 'name',
                        validate: function (value) {

                            // Ref. https://www.npmjs.com/package/node-input-validator //
                            var pass = value.match(Validator);
                            
                            if (pass) {return true};
                            
                            return `Please enter a valid university.`
                        },

                    message: `Please enter the university the intern attends.`
                }
            ]
        ]
    },

    {
        type:'list',
    
        name:'intFutRol',
    
        message:'Does the intern desire to obtain a future role with your company?',

        choices: ['No future role desired.', 'Yes' = [
            {
                type: 'list',
                
                name: 'futRole',
                
                message: `Select the desire role the intern desires.`,
                
                choices: ['Employee', 'Engineer', 'Manager']
            }
        ]]
    }
];


const empQ = [
    
    {
        type:'list',
    
        name:'currDept',
    
        message:'Please state if the current department of the employee.',

        choices:['Engineer', 'Marketing', 'Sales', 'Administration', 'Services'] 
    },

    {
        type:'list',
    
        name:'tenure',
    
        message:'Please state the tenure of the employee.',

        choices:['0-5 Years', '6-10 Years', '11-15 Years', '16-20 Years', '20+ Years']
    },

    {
        type:'list',
    
        name:'promotion',
    
        message:'Please state if the employee is promotable.',

        choices:['Promotable', 'Not ready for promotion.'] 
    },


    {
        type:'list',
    
        name:'promDept',
    
        message:'Please state the department the employee desires to be promoted to.',

        choices:['Engineer', 'Marketing', 'Sales', 'Administration', 'Services'] 
    }
];


const engQ = [
    
    {
        type:'input',
        
        name:'GitHub',
        
        message:'Please supply the GitHub username for your engineer.',

        validate: function (value) {

            // Ref. https://www.npmjs.com/package/node-input-validator //
            var pass = value.match(Validator);
            
            if (pass) {return true};
            
            return `Please enter a valid user name.`
        }
    },

    {
        type:'list',
    
        name:'tenure',
    
        message:'Please state the tenure of the engineer.',

        choices:['0-5 Years', '6-10 Years', '11-15 Years', '16-20 Years', '20+ Years']
    },

    {
        type:'list',
    
        name:'promotion',
    
        message:'Please state if the engineer is promotable.',

        choices:['Promotable', 'Not ready for promotion.']   
    },

    {
        type:'list',
    
        name:'promDept',
    
        message:'Please state the department the engineer desires to be promoted to.',

        choices:['Research & Developmet', 'Marketing', 'Sr. Engineer', 'Sr. Management', 'Executive'] 
    }
];


const mgrQ = [
    
    {
        type:'input',
    
        name:'deskNumber',

        validate: function (value) {

            // Ref. https://www.npmjs.com/package/phone //
            var pass = value.match(phone);
            
            if (pass) {return true};
            
            return `Please enter a valid phone number.`
        },
    
        message:'Please state the desk number to the manager.',
    },

    {
        type:'list',
    
        name:'tenure',
    
        message:'Please state the tenure of the manager.',

        choices:['0-5 Years', '6-10 Years', '11-15 Years', '16-20 Years', '20+ Years']
    },

    {
        type:'list',
    
        name:'personnel',
    
        message:'Please state the amount of personnel the manager oversees.',

        choices:['0-50 Personnel', '51-100 Personnel', '101-500 Personnel', '501-1000 Personnel', '1000-5k Personnel', '5k+ Personnel']
    },

    {
        type:'list',
    
        name:'promotion',
    
        message:'Please state if the manager is promotable.',

        choices:['Promotable', 'Not ready for promotion.']   
    },

    {
        type:'list',
    
        name:'promDept',
    
        message:'Please state the department the manager desires to be promoted to.',

        choices:['Research & Developmet', 'Marketing', 'Executive', 'Sr. Executive'] 
    }
];

module.exports = userInquiries;
module.exports = {intQ, empQ, engQ, mgrQ};