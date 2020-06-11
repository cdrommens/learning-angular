class Employee {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }


}

let employee = new Employee('bruce');

class Manager extends Employee {
    constructor(name: string) {
        super(name);
    }
}