    <header class="page-head quiz-head">
        <h1 class="page-title">Cite les tous</h1>
        <a class="btn btn--ghost" href="?action=accueil">Abandonner</a>
    </header>

    <div class="hud">
        <p class="hud-score"><b id="nb-persos"></b> restants</p>
        <div class="hud-guess">
            <input type="text" id="guess-zone" placeholder="Nom d'un combattant" aria-label="Nom d'un combattant" autocomplete="off" autofocus>
            <button id="btn-valider" class="btn" type="button">Valider</button>
            <p id="errorPerso" role="status"></p>
        </div>
        <div class="hud-time">
            <b id="chrono">15:00</b>
            <button id="btn-pause" class="btn btn--ghost" type="button">Pause</button>
        </div>
    </div>

    <div class="grille-persos">
        <?php foreach ($persos as $perso) : ?>
            <div class="perso-container">
                <div class="perso" data-id="<?php echo $perso['idPerso']; ?>">
                    <img
                        src="imgSSB/cache.png"
                        data-image-reelle="imgSSB/<?php echo htmlspecialchars($perso['image']); ?>"
                        alt="">
                    <p nom-reel="<?php echo htmlspecialchars($perso['nom']); ?>">???</p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <button id="btn-back-to-top" title="Retour en haut" aria-label="Retour en haut"><svg class="i"><use href="ssbu-tips/img/icons.svg#haut"/></svg></button>
