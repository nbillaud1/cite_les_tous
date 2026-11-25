    <header class="page-head quiz-head">
        <h1 class="page-title">Cite les tous</h1>
        <div class="quiz-stats">
            <p><b id="nb-persos"></b> combattants à trouver</p>
            <p><b id="chrono">15:00</b> restantes</p>
            <button id="btn-pause" class="btn btn--ghost" type="button">Pause</button>
            <a class="btn btn--ghost" href="?action=accueil">Abandonner</a>
        </div>
    </header>

    <div class="guess-container">
        <input type="text" id="guess-zone" placeholder="Nom d'un combattant" aria-label="Nom d'un combattant" autocomplete="off" autofocus>
        <button id="btn-valider" class="btn" type="button">Valider</button>
        <p id="errorPerso" role="status"></p>
    </div>

    <div class="grille-persos">
        <?php foreach ($persos as $perso) : ?>
            <div class="perso-container">
                <div class="perso" data-id="<?php echo $perso['idPerso']; ?>">
                    <img
                        src="imgSSB/cache.png"
                        data-image-reelle="imgSSB/<?php echo htmlspecialchars($perso['image']); ?>"
                        alt=""
                        width="64" height="64">
                    <p nom-reel="<?php echo htmlspecialchars($perso['nom']); ?>">???</p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <button id="btn-back-to-top" title="Retour en haut" aria-label="Retour en haut"><svg class="i"><use href="ssbu-tips/img/icons.svg#haut"/></svg></button>
