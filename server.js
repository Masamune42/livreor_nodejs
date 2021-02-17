const express = require('express');

let app = express();

app.set('view engine', 'ejs')

// Quand je passe par /assets, on va récupérer les fichiers qui sont dans le dossier public
app.use('/assets', express.static('public')) // Gestion des fichiers statiques

app.get('/', (request, response) => {
    response.render('pages/index', { test: 'Hello' })
})

app.listen(8080);