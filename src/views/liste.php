<body>
    <h2>Trouve vite tous les personnages de Super Smash Bros Ultimate ! </h2>
    <a href="?action=accueil"><button>Retour à l'acceuil</button></a>
    <div>
        <!-- Boucle permettant de lister les persos -->
        <?php foreach ($persos as $perso) : ?>
            <div>
                <div class="perso" data-id="<?php echo $perso['idPerso']; ?>">
                    <div>
                        <img 
                        src="imgSSB/cache.png"
                        data-image-reelle="imgSSB/<?php echo $perso['image'] ?>" 
                        alt="<?php echo $perso['image'] ?>"
                        height="50px"
                        width="50px">
                        <p><?php echo $perso['nom']; ?></p>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</body>