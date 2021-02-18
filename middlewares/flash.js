// Exemple de construction d'un Middleware
module.exports = function (request, response, next) {

    // S'il y a eu des messages flash dans la session, on les assigne en variable locale et on supprime la variable de session
    if (request.session.flash) {
        response.locals.flash = request.session.flash
        request.session.flash = undefined
    }

    // On indique la fonction qui va recevoir le type et le contenu du message flash
    request.flash = function (type, content) {
        // Si request.session.flash n'existe pas, c'est un objet vide
        if (request.session.flash === undefined) {
            request.session.flash = {}
        }
        // Création du message flash
        request.session.flash[type] = content
    }
    // Fonction qui indique au Middleware de continuer
    next()
}