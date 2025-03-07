import express from 'express';

import mariadb from 'mariadb';

import { validateForm } from './public/services/validation.js';

import dotenv from 'dotenv';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const form = [];

const PORT = 3000;

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit', (req, res) => {

    const submission = {
        first: req.body.fname,
        last: req.body.lname,
        job: req.body.jobtitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        met: req.body.met,
        other: req.body.other,
        message: req.body.message,
        mail: "",
        format: req.body.format,
        timestamp: new Date()
    }

    if (req.body.mail !== "yes") {
        submission.mail = 'no';
    } else {
        submission.mail = req.body.mail;
    }

    console.log(submission);

    const result = validateForm(submission);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return
    }

    form.push(submission);

    res.render('confirm', { submission });
});

app.get('/admin', (req, res) => {

    console.log(form);

    res.render('admin', { form });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});