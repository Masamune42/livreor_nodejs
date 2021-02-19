let connection = require('../config/db')
const moment = require('../config/moment')

class Message {
    // Constructeur qui prend en paramètre un enregistrement
    constructor(row) {
        this.row = row
    }

    // Getters
    get id() {
        return this.row.id
    }

    get content() {
        return this.row.content
    }

    get created_at() {
        // On retourne on objet moment pour formatter la date par la suite
        return moment(this.row.created_at)
    }

    // Fonctions
    // Crée un message en BDD
    static create(content, cb) {
        connection.query('INSERT INTO messages SET content = ?, created_at = ?', [content, new Date()], function (err, result) {
            if (err) throw err
            cb(result)
        })
    }

    // Récupère tous les messages en BDD
    static all(cb) {
        connection.query('SELECT * FROM messages', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Message(row)))
        })
    }

    // Récupère le message avec son ID
    static find(id, cb) {
        connection.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id], (err, rows) => {
            if (err) throw err
            cb(new Message(rows[0]))
        })
    }
}

module.exports = Message