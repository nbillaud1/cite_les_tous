<body>
    <h2>Trouve vite tous les personnages de Super Smash Bros Ultimate ! </h2>
    <a href="?action=accueil"><button>Retour à l'acceuil</button></a>
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
        <button class="btn-valider">Valider</button>
    </div>
</body>