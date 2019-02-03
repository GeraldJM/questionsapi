import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const personSchema = Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String, 
        required: [true, 'Please enter your email'],
        validate: {
            validator: text => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(text),
            message: props => `${props.value} is not a valid email`
        }
    }
});

const Person = mongoose.model('Person', personSchema, 'People');

const createPerson = data => {
    let fn = data.firstName, ln = data.lastName, em = data.email;
    const newPerson = new Person({_id: new mongoose.Types.ObjectId(), firstName: fn, lastName: ln, email: em});
    newPerson.save((err, person) => { if(err) { return err } return person});
}

const updatePerson = (person, data) => {
    let personId = person._id.toString();
    let props = [];

    Person.schema.eachPath(p => props.push(p.toString()));

    for(let p of props) {
        if(p.toString() != "_id" || p.toString() != "__v" ) {
            if(person[p] != data[p]) {
                person[p] = data[p];
            }
        }
    }

    person._id = personId;
    person.save((err, person) => { if(err) { return err } return person});
}

export { Person, createPerson, updatePerson } 