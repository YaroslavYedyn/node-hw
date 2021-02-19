const express = require('express')
const app = express()
const hbs = require('express-handlebars');
const fs = require('fs')
const path = require('path')

const port = 5050;
const pathFiles = path.join(__dirname, 'database', 'users.json')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'page')));

app.set('view engine', '.hbs');
app.engine('.hbs', hbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'page'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


app.get('/users', (req, res) => {
    fs.readFile(pathFiles, (err, data) => {
        if (err) {
            console.log(err);
        }
        const users = JSON.parse(data.toString())
        res.render('users', {users})
    })
})
app.get('/error', (req, res) => {
    res.render('error')
})
app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/auth', (req, res) => {
    res.render('auth')
})

app.post('/auth', (req, res) => {
    const newUser = req.body
    const {username} = req.body
    fs.readFile(pathFiles, (err, data) => {
        if (err) {
            console.log(err);
        }
        const users = JSON.parse(data.toString())
        if (users.some(value => value.username === username)) {
            res.redirect('/error')
        }
        if (users.every(value => value.username !== username)) {
            const arr = [];
            users.map((user) => {
                arr.push(user);
            })
            arr.push(newUser)
            const newUsers = JSON.stringify(arr)
            console.log(newUsers);
            fs.writeFile(pathFiles, newUsers, err => {
                if (err) {
                    console.log(err);
                }
            })
            res.redirect('/users')
        }
    })


})


app.post('/login', (req, res) => {
    fs.readFile(pathFiles, (err, data) => {
        if (err) {
            console.log(err);
        }
        const users = JSON.parse(data.toString())
        const {username, password} = req.body
        users.some((value) => {
            if (value.username === username && value.password === password) {
                res.redirect('/users')
            } else {
                res.render('auth')
            }
        })
    })
})
