// object : below infers automatticaly to:
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string]    => this is a Tuple
// } = {
//     name: 'cederik',
//     age: 34,
//     hobbies: ['Sports','Cooking']
//     role: [2, 'User']
//};

enum Gender { MALE, FEMALE };  // begin with capital
// value will be 0, 1

const person = {
  name: "cederik",
  age: 34,
  hobbies: ['Sports','Cooking'],
  role: [2, 'User'],
  gender: Gender.MALE
};

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase);
}