// Écoute le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {

    let persos = document.querySelectorAll('.perso');
    let nbPersos = persos.length;
    let txtNbPersos = document.getElementById('nb-persos');
    if (!txtNbPersos) return; // le script est chargé sur toutes les pages, mais ne sert qu'au quiz


    let guessZone = document.getElementById('guess-zone');
    let btnValiderGuess = document.getElementById('btn-valider');
    let errorGuess = document.getElementById('errorPerso');

    let btnPause = document.getElementById('btn-pause');
    let grille = document.querySelector('.grille-persos');

    // Gestion du bouton Retour en haut
    let btnBackToTop = document.getElementById('btn-back-to-top');
    if (btnBackToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnBackToTop.classList.add('visible');
            } else {
                btnBackToTop.classList.remove('visible');
            }
        });

        btnBackToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Gestion du chronomètre
    let chronoElement = document.getElementById('chrono');
    let startTime = Date.now();
    let savedTime = 0;
    let isPaused = false;
    const DUREE_PARTIE = 15 * 60; // 15 minutes en secondes
    let timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
        let elapsedTime = Math.floor((Date.now() - startTime + savedTime) / 1000);
        let remainingTime = DUREE_PARTIE - elapsedTime;

        if (remainingTime <= 0) {
            remainingTime = 0;
            clearInterval(timerInterval);
            perdre();
        }

        if (chronoElement) chronoElement.classList.toggle('urgent', remainingTime < 120);

        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;

        let formattedTime = 
            (minutes < 10 ? "0" + minutes : minutes) + ":" + 
            (seconds < 10 ? "0" + seconds : seconds);
        
        if(chronoElement) chronoElement.textContent = formattedTime;
    }

    if (btnPause) {
        btnPause.addEventListener('click', () => {
            if (nbPersos === 0) return;

            if (!isPaused) {
                clearInterval(timerInterval);
                savedTime += Date.now() - startTime;
                isPaused = true;
                btnPause.textContent = "Reprendre";
                guessZone.disabled = true;
                btnValiderGuess.disabled = true;
                grille.classList.add('blurred');
            } else {
                startTime = Date.now();
                timerInterval = setInterval(updateTimer, 1000);
                isPaused = false;
                btnPause.textContent = "Pause";
                guessZone.disabled = false;
                btnValiderGuess.disabled = false;
                grille.classList.remove('blurred');
                guessZone.focus();
            }
        });
    }

    majNbPerso();
    if (nbPersos !== 0){

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


    let foundPersos = new Set();
    function validerGuess(valeurSaisie){
        let valide = false;
        persos.forEach(perso => {
            let nom = perso.querySelector('p').getAttribute('nom-reel');
            if (valeurSaisie.toLowerCase() === nom.toLowerCase() && !foundPersos.has(nom.toLowerCase())){
                montrerPerso(perso);
                errorGuess.textContent = "";
                guessZone.value = "";
                valide = true;
                foundPersos.add(nom.toLowerCase());

                perso.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        if (valeurSaisie !== "" && !valide){
            afficherMessage("Personnage invalide ou déjà trouvé", "error");
        }
        else if (valide) {
            errorGuess.className = "";
            guessZone.classList.add('ok');
            setTimeout(() => guessZone.classList.remove('ok'), 500);
        }
    }

    // Affiche le portrait et le nom ; classe = 'found' (trouvé) ou 'missed' (révélé après la défaite)
    function reveler(perso, classe){
        let img = perso.querySelector('img');
        let nom = perso.querySelector('p');
        img.src = img.getAttribute('data-image-reelle');
        nom.textContent = nom.getAttribute('nom-reel');
        perso.style.pointerEvents = 'none';
        perso.closest('.perso-container').classList.add(classe);
    }

    function montrerPerso(perso){
        reveler(perso, 'found');
        nbPersos --;
        majNbPerso();
    }

    function perdre(){
        guessZone.disabled = true;
        btnValiderGuess.disabled = true;
        btnPause.disabled = true;
        document.querySelector('.hud').classList.add('perdu');
        document.getElementById('fin').hidden = false;
        afficherMessage("Temps écoulé ! C'est perdu...", "perdu");
        grille.classList.add('defaite');
        setTimeout(() => grille.classList.remove('defaite'), 3000);
    }

    document.getElementById('btn-reveler').addEventListener('click', (event) => {
        event.currentTarget.disabled = true;
        let manquants = [...persos].filter(perso => !perso.closest('.perso-container').classList.contains('found'));
        manquants.forEach((perso, i) => setTimeout(() => {
            reveler(perso, 'missed');
            perso.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, i * 150));
    });

    function majNbPerso(){
        txtNbPersos.textContent = nbPersos;
        document.querySelector('.hud').style.setProperty('--done', 1 - nbPersos / persos.length);
        // errorGuess.textContent = "";
        if (nbPersos === 0){
            afficherMessage("Bravo! Vous avez réussi !", "success");
            clearInterval(timerInterval);
            lancerConfettis();
        }
    }

    let messageTimeout;
    function afficherMessage(msg, type) {
        errorGuess.textContent = msg;
        errorGuess.className = `visible ${type}`;
        
        if (type === 'error') {
            clearTimeout(messageTimeout);
            messageTimeout = setTimeout(() => {
                errorGuess.classList.remove('visible');
            }, 2000);
        }
    }

    function lancerConfettis() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);

        let W = window.innerWidth;
        let H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        const particles = [];
        for(let i=0; i<150; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H - H,
                r: Math.random() * 15 + 5,
                d: Math.random() * 150 + 10,
                color: `hsl(${Math.random()*360}, 100%, 50%)`,
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngleIncremental: Math.random() * 0.07 + 0.05,
                tiltAngle: 0
            });
        }

        let animationId;
        let angle = 0;

        function draw() {
            ctx.clearRect(0, 0, W, H);
            angle += 0.01;
            
            for(let i=0; i<particles.length; i++) {
                let p = particles[i];
                
                ctx.beginPath();
                ctx.lineWidth = p.r / 2;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
                ctx.stroke();

                p.tiltAngle += p.tiltAngleIncremental;
                p.y += (Math.cos(angle + p.d) + 3 + p.r / 2) / 2;
                p.x += Math.sin(angle);
                p.tilt = Math.sin(p.tiltAngle) * 15;

                if (p.y > H) {
                    p.x = Math.random() * W;
                    p.y = -20;
                    p.tilt = Math.floor(Math.random() * 10) - 10;
                }
            }
            animationId = requestAnimationFrame(draw);
        }
        
        draw();

        setTimeout(() => {
            cancelAnimationFrame(animationId);
            canvas.remove();
        }, 6000);
    }

});