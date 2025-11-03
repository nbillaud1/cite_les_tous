// Écoute le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {

    let nbPersos = 86;
    let txtNbPersos = document.getElementById('nb-persos');

    let persos = document.querySelectorAll('.perso');

    let guessZone = document.getElementById('guess-zone');
    let btnValiderGuess = document.getElementById('btn-valider');
    let errorGuess = document.getElementById('errorPerso');

    majNbPerso();
    if (nbPersos !== 0){
        persos.forEach(perso => {

            perso.addEventListener('mouseover', (event) => {
                perso.style.background = 'lightgray';
                perso.style.cursor = 'pointer';
            });

            perso.addEventListener('mouseout', (event) => {
                perso.style.background = '';
                perso.style.cursor = '';
            });
        });

        guessZone.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const valeurSaisie = guessZone.value;
                validerGuess(valeurSaisie);
            }
        });

        btnValiderGuess.addEventListener('click', (event) => {
            const valeurSaisie = guessZone.value;
            validerGuess(valeurSaisie);
        });
    }


    function validerGuess(valeurSaisie){
        valide = false;
        persos.forEach(perso => {
            nom = perso.querySelector('p').getAttribute('nom-reel');
            if (valeurSaisie === nom){
                montrerPerso(perso);
                errorGuess.textContent = "";
                guessZone.value = "";
                valide = true;
            }
        });
        if (valeurSaisie !== "" && !valide){
            errorGuess.style.color = "red";
            errorGuess.textContent = "Personnage invalide";
        }
        else{errorGuess.textContent = "";}
    }

    function montrerPerso(perso){
        let img = perso.querySelector('img');
        let nom = perso.querySelector('p');

        if (img) {
            let urlReelle = img.getAttribute('data-image-reelle'); 
            let vrai_nom = nom.getAttribute('nom-reel');
            
            if (urlReelle) {
                img.src = urlReelle;
                perso.style.pointerEvents = 'none';
                nom.textContent = vrai_nom;
            }
        }
        nbPersos --;
        majNbPerso();
    }

    function majNbPerso(){
        txtNbPersos.textContent = nbPersos;
        errorGuess.textContent = "";
        if (nbPersos === 0){
            errorGuess.style.color = "green";
            errorGuess.textContent = "Bravo! Vous avez réussi !";
        }
    }

});