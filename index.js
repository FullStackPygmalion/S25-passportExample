const express = require('express')
const passport = require('passport')
const app = express()

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.send('Haz iniciado sesion')
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.listen(8080, ()=>{
    console.log('Server listening on port 8080')
})