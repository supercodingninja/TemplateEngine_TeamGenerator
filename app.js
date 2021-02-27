// Required Classes. //
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// Required Dependacies. //
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const emailValidator = require('email-validator');
const Validator = require('node-input-validator');
const phone = require('phone');

// Output Paths required for the output file. //
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

// File to be rendered. //
const renderToHTML = require('./lib/htmlRenderer');

// This is how the team's data will be stored. //
teamArr = [];

// This declarations are for the function of adding team members. //
let addMember;

// I do not want to repeat myself.  This variable is created for reusability between the additional team members to be genereated; such as adding an intern: I now only need to include the properties that are exclusive to the intern, etc. //
let employeeQ = [
    {
        type: 'input',
        name: 'name',
        message: 'Please state your name.'
    },

    {
        type: 'input',
        name: 'id'
        , message: 'Please state your ID number.'
    },

    {
        type: 'input',
        name: 'email'
        , message: 'Please state your email.'
    }
];


// Code used by inquirer, to gather information about the development team members. //
function addTeamMember(addMember) {

   if (addMember === 'Intern') {

        addInt();

    }   else if (addMember === 'Engineer') {

        addEng();

    } else if (addMember === 'Manager') {

        addMgr();
    }  
};


// An array containing all employee objects.  The `renderToHTML` function will generate and return a block of HTML including templated divs for each employee. //
function renderToHTML() {

    const team = render(teamArr);

    fs.writeFile(outputPath, team, (err) => {
        if (err) throw err;
        console.log('team.HTML file has been created, successfully; and is located in the `output` directory.');
    });
};


// Inquires for User generating the team. //
function teamGenerator() {

    return inquirer

        .prompt([
            
            {
                type: 'list',

                name: 'userRole',

                message: `What is your role?`,

                choices: ['Intern', 'Engineer', 'Manager','Quit']

            } 
        ])

        .then(data => {

            if (data.userRole === "Quit") {
                
                renderToHTML();
            }
            
            else {
                
                addTeamMember(data.userRole);
            }    
        })
        .catch(err => {
            if (err) throw err;
        });

    // If New Team Member Is An Intern. //
    function addInt() {
        
        employeeQ.push( {
            
            type: 'input',

            name: 'school',
 
            message: 'Please enter the university the intern attends.'
        })

        return inquirer

            .prompt(employeeQ)

            .then(data => {

                const {name, id, email, school} = data;

                const intern = new Intern(name, id, email, school);

                teamArr.push(intern);

                teamGenerator();
            })
            
            .catch(err => {
                
                if (err) throw err;
            });
    };

    
    // If New Team Member Is An Engineer. //
    function addEng() {
        
        employeeQ.push( {
        
            type: 'input',

            name: 'github',
 
            message: `Please enter the engineer's GitHub user name.`
        })

        return inquirer

            .prompt(employeeQ)

            .then(data => {

                const {name, id, email, github} = data;

                const engineer = new Engineer(name, id, email, github);

                teamArr.push(engineer);

                teamGenerator();
            })
            
            .catch(err => {
                if (err) throw err;
            });
    };


    // If New Team Member Is A Manager. //
    function addMgr() {
        
        employeeQ.push({
        
            type: 'input',

            name: 'deskNumber',
 
            message: `Please enter the manager's desk number.`
        })

        return inquirer

            .prompt(employeeQ)

            .then(data => {

                const {name, id, email, github} = data;

                const engineer = new Engineer(name, id, email, github);

                teamArr.push(engineer);

                teamGenerator();
            })
            
            .catch(err => {
                if (err) throw err;
            });
    };

        module.exports = [addInt, addEng, addMgr];
};

teamGenerator();