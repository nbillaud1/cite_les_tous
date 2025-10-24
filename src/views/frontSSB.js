// Écoute le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {


    let persos = document.querySelectorAll('.perso');

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
            
            if (img) {
                // Récupérer l'URL réelle du personnage stockée dans le data-attribute
                let urlReelle = img.getAttribute('data-image-reelle'); 
                
                // Assurez-vous que l'URL réelle est bien présente
                if (urlReelle) {
                    // Remplacer la source (src) de l'image par l'URL réelle
                    img.src = urlReelle;
                    
                    // OPTIONNEL : Désactiver le clic une fois l'image révélée
                    perso.style.pointerEvents = 'none'; 
                }
            }
        });
    });
});