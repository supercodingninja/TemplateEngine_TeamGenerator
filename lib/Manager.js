// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager extends Employee {
    
    constructor(name, id, email, deskNumber) {
    
        super(name, id, email);
    
        this.deskNumber = deskNumber;
    }

    findRole() {
        
        return 'Manager';
    }

    findDN() {
        
        return this.deskNumber;
    }


};

module.exports = Manager;