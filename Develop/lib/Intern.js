// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('Develop/lib/Employee.js');

class Intern extends Employee {
    
    constructor(name, id, email, university) {
    
        super(name, id, email);
    
        this.university = university;
    }

    findRole() {
    
        return "Intern";
    }

    retrieveUniversity() {
    
        return this.university;
    }
}

module.exports = Intern;