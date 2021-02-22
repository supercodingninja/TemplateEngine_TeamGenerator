// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('Develop/lib/Employee.js');

class Engineer extends Employee {
   
    constructor(name, id, email, githubProfile) {
   
        super(name, id, email);
   
        this.githubProfile = githubProfile;
    }

    findRole() {
   
        return 'Engineer';
    }

    getGithubProfile() {
   
        return this.githubProfile;
    }
};

module.exports = Engineer;