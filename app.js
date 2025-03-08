import express from 'express';

import mariadb from 'mariadb';

import { validateForm } from './public/services/validation.js';

import dotenv from 'dotenv';

dotenv.config()

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_Name,
    port: process.env.DB_PORT
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database ${err}`);
    }
}

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const form = [];

const PORT = 3000;

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit', async (req, res) => {

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

    const result = validateForm(submission);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return
    }

    form.push(submission);
    console.log(form);

    const conn = await connect();

    const insertQuery = await conn.query(`INSERT INTO guest (first, last, job, company, linkedin, email, meet, other, message, mailing, format) VALUES (?,?,?,?,?,?,?,?,?,?,?);`,
        [submission.first,
        submission.last,
        submission.job,
        submission.company,
        submission.linkedin,
        submission.email,
        submission.met,
        submission.other,
        submission.message,
        submission.mail,
        submission.format]);


    res.render('confirm', { submission });
});

app.get('/admin', async (req, res) => {

    const conn = await connect();

    const guests = await conn.query('SELECT * FROM guest;');

    console.log(guests);

    res.render('admin', { guests });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});