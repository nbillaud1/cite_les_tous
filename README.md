# Cite Les Tous + SSBU Tips

- **Cite Les Tous** (`index.php`, `src/`) : quiz PHP/MySQL, retrouver les 86 personnages de Super Smash Bros Ultimate en 15 minutes.
- **SSBU Tips** (`ssbu-tips/`) : site HTML/CSS d'astuces sur le jeu. Les deux partagent le thème `ssbu-tips/css/theme.css`.

## Lancer en local (WAMP)

1. Placer le dossier dans `C:\wamp64\www\` et démarrer WampServer.
2. Importer la base : `mysql -u root < database.sql` (ou via phpMyAdmin, onglet Importer). MySQL 8+ requis.
3. Ouvrir http://localhost/Projects/cite_les_tous/ (adapter le chemin).

Identifiants MySQL par défaut : `root` sans mot de passe. Pour un autre serveur, définir les variables d'environnement `DB_HOST`, `DB_USER` et `DB_PASS`.

## En ligne (GitHub Pages)

À chaque push sur `main`, le workflow `.github/workflows/pages.yml` importe la base dans un MySQL temporaire, fait tourner le PHP une fois (`build-static.sh`) et publie le HTML généré sur GitHub Pages. Le quiz tourne ensuite entièrement côté navigateur.

Pour tester la génération en local : `./build-static.sh` (PHP et la base importée requis), puis servir le dossier `_site/`.
