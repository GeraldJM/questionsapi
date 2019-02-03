import mongoose from 'mongoose';
import { Person } from '../people/Person';

const Schema = mongoose.Schema;

const questionSchema = Schema({
    reporter: {type: Schema.Types.ObjectId, ref: 'Person'},
    description: String
});

const createQuestion = data => {
    let p = data.reporter, d = data.description;
    let first = p.firstName, last = p.lastName, email = p.email

    const person = new Person({ _id: new mongoose.Types.ObjectId(), firstName: first, lastName: last, email: email });
    const personId = person._id;

    let question = new Question({ _id: new mongoose.Types.ObjectId(), reporter: personId, description: d });

    person.save(err => {if(err) return err});
    question.save((err, newQuestion) => { 
        if(err) { return err; } 
        return { createdQuestion: newQuestion, createdPerson: person };
    });
}

const updateQuestion = (question, data) => {
    let questionId = question._id;
    let props = [];

    Question.schema.eachPath(p => props.push(p.toString()));

    for(let p of props) {
        if(p.toString() != "_id" || p.toString() != "__v" ) {
            if(question[p] != data[p]) {
                question[p] = data[p];
            }
        }
    }

    question._id = questionId;
    question.save();
    return question;
} 

const Question = mongoose.model("Question", questionSchema, "Questions"); 

export {
    Question,
    createQuestion,
    updateQuestion
} 
  