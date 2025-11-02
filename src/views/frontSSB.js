// Écoute le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {

    let persos = document.querySelectorAll('.perso');

    let guessZone = document.getElementById('guess-zone');
    let btnValiderGuess = document.getElementById('btn-valider');

    persos.forEach(perso => {

        perso.addEventListener('mouseover', (event) => {
            perso.style.background = 'lightgray';
            perso.style.cursor = 'pointer';
        });

        perso.addEventListener('mouseout', (event) => {
            perso.style.background = '';
            perso.style.cursor = '';
        });

        perso.addEventListener('click', (event) => {
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
        });
    });

    guessZone.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const valeurSaisie = guessZone.value;
            console.log("Saisie validée avec Entrée ! Valeur: ", valeurSaisie);
        }
    });

    btnValiderGuess.addEventListener('click', (event) => {
        const valeurSaisie = guessZone.value;
        console.log("Sasie validée avec le bouton Valider ! Valeur: ", valeurSaisie);
    });
});