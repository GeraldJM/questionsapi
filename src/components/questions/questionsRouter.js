import express from 'express';
import mongoose from 'mongoose';

import { Question, createQuestion, updateQuestion } from './Question';

const QuestionsRouter = express.Router();

QuestionsRouter.route('/')
    .get((req, res) => { Question.find({}, (err, questions) => { err ? console.log(err) : res.send(questions)}); })
    .post((req, res) => res.send(createQuestion(req.body)));

QuestionsRouter.route('/:id')
    .get((req, res) => Question.findById(req.params.id, (err, question) => err ? res.send(404, err) : res.send(question)))
    .put((req, res) => Question.findById(req.params.id, (err, question) => err ? res.send(404, err) : res.send(updateQuestion(question, req.body)) ))
    .delete((req, res) => Question.findByIdAndDelete(req.params.id, (err, question) => err ? res.send(404, err) : res.send(`Deleted: ${question}`)))

export default QuestionsRouter;