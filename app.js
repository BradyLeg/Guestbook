import express from 'express';

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

    if (submission.first.trim() == "") {
        res.send("Invaild Input");
        return;
    }

    if (submission.last.trim() == "") {
        res.send("Invaild Input");
        return;
    }

    if (submission.email.trim() == "") {
        res.send("Invaild Input");
        return;
    }

    console.log(req.body);
    form.push(submission);

    res.render('confirm', { submission });
});

app.get('/admin', (req, res) => {

    console.log(form)

    res.render('admin', { form });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});