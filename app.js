/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

//Connection à la bdd
//const bdd = require('mongoose');
//bdd.connect('mongodb://admin:veille1234@ds231228.mlab.com:31228/veille-node5');
const BDD = require('mongodb').MongoClient;

//Assignation du moteur de rendu et middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/assets/'));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/membres', (req, res) => {
    Membre.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('membres', {
                data: data
            });
        };
    });
});

app.get('/formulaire', (req, res) => {
    res.render('formulaire');
});

app.get('/traiter_form', (req, res) => {
    let nouveauMembre = new Membre({
        prenom: req.query.prenom,
        nom: req.query.nom,
        tel: req.query.tel,
        courriel: req.query.courriel
    });

    nouveauMembre.save((err, enreg) => {
        if (err) {
            res.status(500).send(err);
        } else {
            Membre.find((err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.render('membres', {
                        data: data
                    });
                };
            });
        };
    });
});

app.post('/formulaire', (req, res) => {
    res.render('formulaire');
});

app.use((req, res) => {
    res.status(404).render('404');
});

BDD.connect('mongodb://127.0.0.1:27017', (err, database) => {
    if (err) return console.log(err)
    db = database.db('carnet_adresse')
    // lancement du serveur Express sur le port 8081
    app.listen(8081, () => {
        console.log('connexion à la BD et on écoute sur le port 8081')
    })
})