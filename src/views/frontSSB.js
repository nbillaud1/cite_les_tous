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

        if(chronoElement) chronoElement.textContent = formater(remainingTime);
    }

    // 125 -> "02:05"
    function formater(secondes) {
        return String(Math.floor(secondes / 60)).padStart(2, '0') + ":" + String(secondes % 60).padStart(2, '0');
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


    // ---------- Saisie tolérante ----------

    // "Mr. Game & Watch" -> "mrgamewatch" : sans accents, majuscules, espaces, ponctuation ni « et / and »
    function normaliser(texte) {
        return texte.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
            .split(/[^a-z0-9]+/).filter(mot => mot && mot !== 'et' && mot !== 'and').join('');
    }

    // Nombre de fautes entre deux mots : lettre en trop, en moins, remplacée, ou deux lettres inversées
    function distance(a, b) {
        let d = [];
        for (let i = 0; i <= a.length; i++) d[i] = [i];
        for (let j = 0; j <= b.length; j++) d[0][j] = j;
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                let cout = a[i - 1] === b[j - 1] ? 0 : 1;
                d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cout);
                if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                    d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
                }
            }
        }
        return d[a.length][b.length];
    }

    // Fautes tolérées : aucune sur les noms courts (Roy/Rob, Ken...), 1 dès 5 lettres, 2 dès 10
    function tolerance(longueur) {
        return longueur >= 10 ? 2 : longueur >= 5 ? 1 : 0;
    }

    // Chaque combattant avec son nom et ses alias (noms anglais, abréviations) déjà normalisés
    let fiches = [...persos].map(perso => ({
        perso,
        noms: [perso.querySelector('p').getAttribute('nom-reel'), ...perso.dataset.alias.split('|')]
            .map(normaliser).filter(Boolean)
    }));

    // Renvoie le combattant visé par la saisie, ou null si inconnu ou ambigu
    function trouverPerso(saisie) {
        let s = normaliser(saisie);
        if (!s) return null;

        let exact = fiches.find(fiche => fiche.noms.includes(s));
        if (exact) return exact.perso;

        let meilleure = Infinity, candidats = [];
        for (let fiche of fiches) {
            let d = Math.min(...fiche.noms.map(nom =>
                distance(s, nom) <= tolerance(Math.min(s.length, nom.length)) ? distance(s, nom) : Infinity));
            if (d < meilleure) { meilleure = d; candidats = [fiche]; }
            else if (d === meilleure && d !== Infinity) candidats.push(fiche);
        }
        // Deux combattants aussi proches l'un que l'autre (ex. « Marto » : Mario ou Marth ?) : on refuse
        return candidats.length === 1 ? candidats[0].perso : null;
    }

    function validerGuess(valeurSaisie){
        if (valeurSaisie.trim() === "") return;
        let perso = trouverPerso(valeurSaisie);

        if (!perso) {
            afficherMessage("Combattant inconnu, vérifiez l'orthographe", "error");
            return;
        }
        if (perso.closest('.perso-container').classList.contains('found')) {
            afficherMessage(perso.querySelector('p').textContent + " est déjà trouvé", "error");
            return;
        }

        errorGuess.textContent = "";
        guessZone.value = "";
        montrerPerso(perso);
        perso.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (nbPersos > 0) errorGuess.className = ""; // sinon on effacerait le message de victoire
        guessZone.classList.add('ok');
        setTimeout(() => guessZone.classList.remove('ok'), 500);
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
        if (nbPersos === 0) gagner();
    }

    function gagner(){
        clearInterval(timerInterval);
        let tempsMis = Math.floor((Date.now() - startTime + savedTime) / 1000);
        guessZone.disabled = true;
        btnValiderGuess.disabled = true;
        btnPause.disabled = true;
        document.querySelector('.hud').classList.add('gagne');
        document.getElementById('fin-victoire').hidden = false;
        afficherMessage("Bravo, vous les avez tous trouvés !", "success");

        // Vague de lumière sur toutes les cases, puis bannière et confettis
        persos.forEach((perso, i) => perso.closest('.perso-container').style.setProperty('--i', i));
        grille.classList.add('victoire');
        setTimeout(() => grille.classList.remove('victoire'), 4000);

        let banniere = document.getElementById('banniere');
        document.getElementById('temps-final').textContent = "Tous trouvés en " + formater(tempsMis);
        banniere.hidden = false;
        setTimeout(() => banniere.hidden = true, 4200);
        setTimeout(lancerConfettis, 500);
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

    // Les couleurs des sections de SSBU Tips (voir theme.css)
    const COULEURS_SITE = ['#e5262f', '#2f73e6', '#de3a8f', '#f4a614', '#20a84c', '#18bfd3', '#eef0f4'];

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
                color: COULEURS_SITE[i % COULEURS_SITE.length],
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