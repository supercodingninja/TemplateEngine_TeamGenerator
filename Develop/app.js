// Required Classes. //
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const q = require('./lib/q')

// Required Dependacies. //
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const emailValidator = require('email-validator');
const { Validator } = require('node-input-validator');

// Output Paths required for the output file. //
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

// Render file required. //
const render = require('./lib/htmlRenderer');

// Engage Queries. //
const intQ = q.empQ;
const empQ = q.empQ;
const engQ = q.engQ;
const mgrQ = q.mgrQ;

// These declarations are for the function of adding team members. //
let {memStat};
let addMember;

// This declaration is for the function intializing the team building generator. //
init();


// Code used by inquirer, to gather information about the development team members. //
function addTeamMember() {

    if ({memStat} === 'No additional members.') {

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
           
            employeesArr.push(manager);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });
};


function addInt() {
    
    intQ.Queries()

        .then(data => {
           
            const {name, id, email, GitHub, University, intFutRol} = data;
           
            addMember = data.addMember;
           
            const intern = new Manager(name, id, email, GitHub, University, intFutRol);
           
            employeesArr.push(intern);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });
};


function addEmp() {
    
    empQ.Queries()

        .then(data => {
           
            const {name, id, email, currDept, tenure, promotion, promDept} = data;
           
            addMember = data.addMember;
           
            const employee = new Manager(name, id, email, currDept, tenure, promotion, promDept);
           
            employeesArr.push(employee);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });
};


function addEng() {
    
    console.log('Time to build your team!');
    
    mgrQ.Queries()

        .then(data => {
           
            const {name, id, email, GitHub, tenure, promotion, promDept} = data;
           
            addMember = data.addMember;
           
            const engineer = new Manager(name, id, email, GitHub, tenure, promotion, promDept);
           
            employeesArr.push(engineer);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });
};


function addMgr() {
    
    console.log('Time to build your team!');
    
    mgrQ.Queries()

        .then(data => {
           
            const {name, id, email, deskNumber} = data;
           
            addMember = data.addMember;
           
            const manager = new Manager(name, id, email, deskNumber, tenure, personnel, promotion, promDept);
           
            employeesArr.push(manager);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });
};


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```