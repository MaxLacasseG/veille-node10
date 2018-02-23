/*jshint esversion: 6 */
"use stric";
/** 
 * Script servant à gérer la recherche d'un membre
 */


let input = document.querySelector('.formulaireRechercher input[type="submit"]');
/**
 * Fonction lancée lors du click du formulaire
 * On empêche de lancer la requête par défaut
 */
input.addEventListener('click', (evt) => {
    evt.preventDefault();

    let objet = {
        recherche: document.querySelector("#rechercheReq").value,
    };

    //On lance une requête AJAX pour récupérer les membres
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "/rechercherMembre");
    ajax.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            afficherRecherche(JSON.parse(ajax.responseText));
        }
    };
    ajax.send(JSON.stringify(objet));

});

//Fonction appelée après la requête AJAX
// @param tabResultats  Le tableau des membres recherchés
const afficherRecherche = (tabResultats) => {
    console.log(tabResultats);
    let table = document.querySelector("table tbody");
    let trs = [];
    trs = table.querySelectorAll("tr.donneesListe");
    for (let elm of trs) {
        elm.parentNode.removeChild(elm);
    }
    for (let entree of tabResultats) {
        let tr = document.createElement("tr");
        tr.classList.add("donneesListe");
        for (let prop in entree) {
            if (prop != "_id") {
                let td = document.createElement("td");
                td.classList.add(prop);
                td.contentEditable = true;
                let val = document.createTextNode(entree[prop].toString());
                td.appendChild(val);
                tr.appendChild(td);
            }
        }

        table.appendChild(tr);
    }
}