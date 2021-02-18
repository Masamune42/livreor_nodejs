const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

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


// Routes
app.get('/', (request, response) => {
    // Si on a une erreur en session, on récupère une variable local dans la réponse et on repasse la variable de session à undefined
    if (request.session.error) {
        response.locals.error = request.session.error
        request.session.error = undefined
    }
    console.log(request.session)
    response.render('pages/index')
})

app.post('/', (request, response) => {
    // Si le champ est vide
    if (request.body.message === undefined || request.body.message === '') {
        // On stocke une erreur en session et on redirige
        request.session.error = "Vous n'avez pas posté de message"
        response.redirect('/')
    }
})

app.listen(8080)