import express from 'express';
import mongoose from 'mongoose';

import { Person, createPerson, updatePerson } from './Person';

const PeopleRouter = express.Router();

PeopleRouter.route('/')
    .get((req, res) => Person.find({}, (err, people) => err ? res.send(404, err) : res.send(people)))
    .post((req, res) => res.send(createPerson(req.body)));

PeopleRouter.route('/:id')
    .get((req, res) => Person.findById(req.params.id, (err, person) => err ? res.send(404, err) : res.send(person)))
    .put((req, res) => Person.findById(req.params.id, (err, person) => err ? res.send(404, err) : res.send(updatePerson(person, req.body))))
    .delete((req, res) => Person.findByIdAndDelete(req.params.id, (err, person) => err ? res.send(404, err) : res.send(`Deleted: ${person}`)));
    
export default PeopleRouter;
