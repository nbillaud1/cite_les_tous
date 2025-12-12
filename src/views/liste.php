<body>
    <div class="header-info">
        <h2>Trouve vite tous les personnages de Super Smash Bros Ultimate ! <br> Personnages restants : <b id="nb-persos"></b> </h2>
        <h3>Temps restant : <span id="chrono">15:00</span></h3>
        <button id="btn-pause">Pause</button>
        <a href="?action=accueil"><button>Retour à l'accueil</button></a>
    </div>
    <div class="grille-persos">
        <!-- Boucle permettant de lister les persos -->
        <?php foreach ($persos as $perso) : ?>
            <div class="perso-container">
                <div class="perso" data-id="<?php echo $perso['idPerso']; ?>">
                    <div>
                        <img 
                        src="imgSSB/cache.png"
                        data-image-reelle="imgSSB/<?php echo $perso['image']; ?>" 
                        alt="<?php echo $perso['image'] ?>"
                        height="50px"
                        width="50px">
                        <p nom-reel="<?php echo $perso['nom'];?>">???</p>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <div class="guess-container">
        <input type="text" id="guess-zone" placeholder="Entrez votre guess ici !"> <!--Faire que l'on puisse apuyer sur entrer ou cliquer sur un bouton pour valider le guess-->
        <button id="btn-valider">Valider</button>
        <p id="errorPerso"></p>
    </div>
    <button id="btn-back-to-top" title="Retour en haut">&#8593;</button>