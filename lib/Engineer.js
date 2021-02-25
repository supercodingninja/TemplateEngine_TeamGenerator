// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Engineer extends Employee {
   
    constructor(name, id, email, GitHub) {
   
        super(name, id, email);
   
        this.GitHub = GitHub;
    }

    getRole() {
   
        return 'Engineer';
    }

    getGitHub() {
   
        return this.GitHub;
    }
};

module.exports = Engineer;