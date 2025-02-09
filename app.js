import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const form = [];

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.post('/submit', (req, res) => {
    console.log(req.body);
    form.push(req.body);
    res.send(`<h1>Thank you for filling out the form ${req.body.fname}!</h1>`);
});

app.get('/admin/form', (req, res) => {
    res.send(form);
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});