const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mysql = require('mysql')
const { request } = require('express')
let Message = require('./models/message')
let app = express()

// Moteur de templates
app.set('view engine', 'ejs')

// Middleware
// Quand je passe par /assets, on va récupérer les fichiers qui sont dans le dossier public
app.use('/assets', express.static('public')) // Gestion des fichiers statiques

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'ffezfez',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(require('./middlewares/flash'))

// Routes
// Accueil
app.get('/', (request, response) => {
    Message.all(function (messages) {
        response.render('pages/index', { messages: messages })
    })
})
// Envoi d'un message
app.post('/', (request, response) => {
    // Si le champ est vide
    if (request.body.message === undefined || request.body.message === '') {
        // On stocke une erreur dans la requête flash du Middleware qu'on a créé et on redirige
        request.flash('error', "Vous n'avez pas posté de message")
        response.redirect('/')
    } else {
        Message.create(request.body.message, function () {
            request.flash('success', "Merci !")
            response.redirect('/')
        })
    }
})
// Affichage d'un message
app.get('/message/:id', (request, response) => {
    Message.find(request.params.id, function (message) {
        response.render('pages/show', { message: message })
    });
})

app.listen(8080)