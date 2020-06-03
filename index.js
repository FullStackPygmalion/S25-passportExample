const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const PassportLocal = require('passport-local').Strategy

const app = express()

app.use(express.urlencoded({extended : true}))
app.use(cookieParser('mi frase secreta'))

app.use( session({
    secret : 'mi frase secreta',
    resave: true, 
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new PassportLocal( function(username, password, done){
    if(username === 'Juanito' && password === '12345'){
        return done(null, { id: 4, name: 'Juanito'} )
    } 
    done(null, false)
}))
// Serializacion
passport.serializeUser(function(user, done){
    done(null,user.id)
})
// Deserializacion
passport.deserializeUser(function(id, done){
    done(null, { id: 4, name: 'Juanito'})
})

app.set('view engine', 'ejs')

app.get("/", (req, res, next) => {
    if(req.isAuthenticated()) return next()
    res.redirect("/login")
}, (req, res)=> {
    res.send('Haz iniciado sesion')
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", passport.authenticate('local',{
    successRedirect: "/", 
    failureRedirect: "/login"
}))

app.listen(8080, ()=>{
    console.log('Server listening on port 8080')
})