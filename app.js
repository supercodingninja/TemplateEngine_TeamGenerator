// Required Classes. //
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// Required Dependacies. //
const path = require('./output/team.html');
const fs = require('fs');
const inquirer = require('inquirer');
const emailValidator = require('email-validator');
const {Validator} = require('node-input-validator');
const phone = require('phone');
// var q = require('app.js');

// Output Paths required for the output file. //
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

// File to be rendered. //
const renderToHTML = require('./lib/htmlRenderer');

// This is how the team's data will be stored. //
teamArr =[ ]; // Not sure, yet. //

// Inquires for User generating the team. //
function userPrompt {

    return inquirer

        .prompt ([
            {
                type: 'input',
                
                name: 'userName',

                    validate: function (value) {

                        // Ref. https://www.npmjs.com/package/node-input-validator //
                        var pass = value.match(Validator);
                        
                        if (pass) {return true};
                        
                        return `Please enter a valid user name.`;
                    },

                message: `What is your name?`
            },

            {
                type: 'list',
                
                name: 'userRole',

                message: `What is your role?`,
                
                choices: ['Intern', 'Employee', 'Engineer', 'Manager']

            },
            
            {
                type: 'input',
                
                name: 'userID',

                    validate: function (value) {

                        // Ref. https://www.npmjs.com/package/node-input-validator //
                        var pass = value.match('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWUXYZ'.split(''));
                        
                        if (pass) { return true };
                        
                        return `Please enter a valid ID number.`
                    },
                
                message: `Please enter your ID number?`
            },

            {
                type: 'input',
                
                name: 'userEmail',
                
                    // Ref. https://www.npmjs.com/package/email-validator //
                    validate: emailValidator,
                
                message: `What is your email address?`,
            },

            {
                type: 'list',
                
                name: 'addMember',
                
                message: `Select which team member you would like to add.`,
                
                choices: ['No additional members.', 'Intern', 'Employee', 'Engineer', 'Manager']
            }
        ])
};

// Engage Queries. //
const intQ = q.empQ;
const empQ = q.empQ;
const engQ = q.engQ;
const mgrQ = q.mgrQ;

// These declarations are for the function of adding team members. //
let addMember;

// This declaration is for the function intializing the team building generator. //
init();


// Code used by inquirer, to gather information about the development team members. //
function addTeamMember() {

    if (${response.member} === 'No additional members.') {

    } else if (addMember === 'Intern') {
        
        addInt();

    } else if (addMember === 'Employee') {

        addEmp();

    } else if (addMember === 'Engineer') {

        addEng();

    } else if (addMember === 'Manager') {

        addMgr();

    } else {

        const html = render(teamArr);
        
        fs.writeFile(outputPath, html, (err) => {
           
            if (err) throw err;
            
            console.log('The team members written to file, and saved.');
        });
    }
};


function init() {
    
    console.log('Time to build your team!');
    
    mgrQ.Queries()

        .then(data => {
           
            const {name, id, email, deskNumber} = data;
           
            addMember = data.addMember;
           
            const manager = new Manager(name, id, email, deskNumber, tenure, personnel, promotion, promDept);
           
            teamArr.push(manager);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });
    
    return inquirer;
};


function addInt() {
    
    intQ.Queries()

        .then(data => {
           
            const {name, id, email, GitHub, University, intFutRol} = data;
           
            addMember = data.addMember;
           
            const intern = new Intern(name, id, email, GitHub, University, intFutRol);
           
            teamArr.push(intern);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });
    
    return inquirer;
};


function addEmp() {
    
    empQ.Queries()

        .then(data => {
           
            const {name, id, email, currDept, tenure, promotion, promDept} = data;
           
            addMember = data.addMember;
           
            const employee = new Employee(name, id, email, currDept, tenure, promotion, promDept);
           
            teamArr.push(employee);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });

    return inquirer;
};


function addEng() {
    
    console.log('Time to build your team!');
    
    engQ.Queries()

        .then(data => {
           
            const {name, id, email, GitHub, tenure, promotion, promDept} = data;
           
            addMember = data.addMember;
           
            const engineer = new Engineer(name, id, email, GitHub, tenure, promotion, promDept);
           
            teamArr.push(engineer);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });

    return inquirer;
};


function addMgr() {
    
    console.log('Time to build your team!');
    
    mgrQ.Queries()

        .then(data => {
           
            const {name, id, email, deskNumber} = data;
           
            addMember = data.addMember;
           
            const manager = new Manager(name, id, email, deskNumber, tenure, personnel, promotion, promDept);
           
            teamArr.push(manager);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });

        return inquirer;
};


// An array containing all employee objects.  The `renderToHTML` function will generate and return a block of HTML including templated divs for each employee. //
function renderToHTML() {

    const team = render(teamArr);

    fs.writeFile(outputPath, team, (err) => {
        if (err) throw err;
        console.log('team.HTML file has been created, successfully; and is located in the `output` directory.');
    });
};