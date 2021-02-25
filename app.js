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
// var q = require('app.js');

// Output Paths required for the output file. //
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

// File to be rendered. //
const renderToHTML = require('./lib/htmlRenderer');

// This is how the team's data will be stored. //
teamArr =[ ]; // Not sure, yet. //

// These declarations are for the function of adding team members. //
let addMember;


// Code used by inquirer, to gather information about the development team members. //
function addTeamMember() {

    if (addmember === 'No additional members.') {

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


// An array containing all employee objects.  The `renderToHTML` function will generate and return a block of HTML including templated divs for each employee. //
function render() {

    const team = render(teamArr);

    fs.writeFile(outputPath, team, (err) => {
        if (err) throw err;
        console.log('team.HTML file has been created, successfully; and is located in the `output` directory.');
    });
};


// Inquires for User generating the team. //
function teamGenerator(response) {

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
        
        .then(data => {
           
            const userData = (userName, userRole, userID, userEmail);
           
            addMember = data.addMember;
           
            teamArr.push(userData);

            console.log(`Time to build your team!  Let's Go!`);
           
            addTeamMember();
        })
        .catch(err => {
            if (err) throw err;
        });

        // If New Team Member Is An Intern. //
        function addInt() {

            return inquirer

                .prompt ([

                    {
                        type:'input',
                        
                        name:'GitHub',

                        validate: function (value) {

                            // Ref. https://www.npmjs.com/package/node-input-validator //
                            var pass = value.match(Validator);
                            
                            if (pass) {return true};
                            
                            return `Please enter a valid user name.`;
                        },

                        message: `Please enter the intern's GitHub profile.` 
                        
                        // message:'Does the intern have a GitHub profile?',
                
                        // choices: ['No.','Yes.'],
                        
                        //     if (Yes) {return true},
                            
                        //     return choices:
                            
                        //         {
                        //             type: 'input',
                                        
                        //             name: 'GitHub',
                        //                 validate: function (value) {
                
                        //                     var pass = value.match(Validator);
                                            
                        //                     if (pass) {return true};
                                            
                        //                     return `Please enter a valid user name.`
                        //                 },
                
                        //             message: `Please enter the GitHub user name for the intern.`
                        //         }
                    },
                
                    {
                        type:'input',
                        
                        name:'University',

                        validate: function (value) {

                            // Ref. https://www.npmjs.com/package/node-input-validator //
                            var pass = value.match(Validator);
                            
                            if (pass) {return true};
                            
                            return `Please enter a valid user name.`;
                        },

                        message: 'Please enter the university the intern attends.'
                        
                        // message:'Does the intern attend an university?',
                
                        // choices: ['No.','Yes.' = [
                                
                        //         {
                            
                        //             type: 'input',
                                        
                        //             name: 'name',
                        //                 validate: function (value) {
                
                        //                     // Ref. https://www.npmjs.com/package/node-input-validator //
                        //                     var pass = value.match(Validator);
                                            
                        //                     if (pass) {return true};
                                            
                        //                     return `Please enter a valid university.`
                        //                 },
                
                        //             message: `Please enter the university the intern attends.`
                        //         }
                        //     ]
                        // ]
                    },
                
                    {
                        type:'list',
                    
                        name:'intFutRol',
                    
                        message:'State the position the future role the intern would like to obtain with your company.',
                
                        choices: ['Employee', 'Engineer', 'Manager']
                            
                    }
                ])
        
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


        // If New Team Member Is An Employee. //
        function addEmp() {

            return inquirer

                .prompt ([
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
                ])
        
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

        
        // If New Team Member Is An Engineer. //
        function addEng() {

            return inquirer

                .prompt ([
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
                ])
        
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


        // If New Team Member Is A Manager. //
        function addMgr() {

            return inquirer

                .prompt ([
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
                ])
        
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
        
                module.exports = (userData, addInt, addEmp, addEng, addMgr);
        };
};

teamGenerator();