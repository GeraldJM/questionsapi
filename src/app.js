// TODO: Convert 'if' statements to es6 syntax
import express from 'express';
import mongoose from 'mongoose';

import QuestionsRouter from './components/questions/questionsRouter';
import PeopleRouter from './components/people/peopleRouter';

const port = process.env.port || 3000;

// Mongoose Configuration
mongoose.connect('mongodb://localhost:27017/QuestionsApi', {useNewUrlParser: true}, err => {
    if(err) { console.error(err); } 
    else { console.log("Connected to MongoDB!"); }
});

// Express Configuration
const app = express();

app.use(express.json());
app.use('/questions', QuestionsRouter);
app.use('/people', PeopleRouter);                     

app.get('/', (req, res) => {
    res.send('HOME');
});

app.listen(port, console.log(`Express server listening on port ${port}`));