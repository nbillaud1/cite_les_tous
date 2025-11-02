// Écoute le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    document.preventDefault();
    console.log("Hello");

    let persos = document.querySelectorAll('.perso');

    let guessContainer = document.getElementsByClassName('guess-container');
    let guessZone = guessContainer.getElementById('guess-zone');

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
            // Cibler l'élément <img> à l'intérieur de l'élément cliqué
            let img = perso.querySelector('img'); 
            let nom = perso.querySelector('p');

            
            if (img) {
                // Récupérer l'URL réelle du personnage stockée dans le data-attribute
                let urlReelle = img.getAttribute('data-image-reelle'); 

                let vrai_nom = nom.getAttribute('nom-reel');
                
                // Assurez-vous que l'URL réelle est bien présente
                if (urlReelle) {
                    // Remplacer la source (src) de l'image par l'URL réelle
                    img.src = urlReelle;
                    
                    perso.style.pointerEvents = 'none';
                    nom.textContent = vrai_nom;
                }
            }
        });
    });

    if (guessZone) {
        guessZone.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); 
                const valeurSaisie = guessZone.value;
                console.log("Saisie validée avec Entrée ! Valeur:", valeurSaisie);
            }
            console.log("Key Listened !"); // Vérifiez si ce message apparaît
        });
    } else {
        console.error("Élément 'guess-zone' introuvable. Vérifiez l'ID.");
    }
});