// Required Classes. //
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const q = require('./lib/q')

// Required Dependacies. //
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

// Output Paths required for the output file. //
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

// Render file required. //
const renderToHTML = require('./lib/htmlRenderer');

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
    
    return inquirer;
};


function addInt() {
    
    intQ.Queries()

        .then(data => {
           
            const {name, id, email, GitHub, University, intFutRol} = data;
           
            addMember = data.addMember;
           
            const intern = new Intern(name, id, email, GitHub, University, intFutRol);
           
            employeesArr.push(intern);
           
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
           
            employeesArr.push(employee);
           
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
           
            employeesArr.push(engineer);
           
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
           
            employeesArr.push(manager);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });

        return inquirer;
};


// Aan array containing all employee objects.  The `renderToHTML` function will generate and return a block of HTML including templated divs for each employee. //
function renderToHTML() {

    const team = render(employeesArr);

    fs.writeFile(outputPath, team, (err) => {
        if (err) throw err;
        console.log('team.HTML file has been created, successfully; and is located in the `output` directory.');
    });
};