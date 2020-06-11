interface Person {
    firstname: string;
    middlename ?: string;  // optional
    lastname: string;
}

function printName(person: Person) {
    console.log(person.firstname + person.lastname);
}

let person = {
    firstname: 'bruce',
    lastname: 'wayne'
};

printName(person);