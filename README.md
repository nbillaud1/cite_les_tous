# Cite Les Tous + SSBU Tips

- **Cite Les Tous** (`index.php`, `src/`) : quiz PHP/MySQL, retrouver les 86 personnages de Super Smash Bros Ultimate en 15 minutes.
- **SSBU Tips** (`ssbu-tips/`) : site HTML/CSS d'astuces sur le jeu. Les deux partagent le thème `ssbu-tips/css/theme.css`.

## Lancer en local (WAMP)

1. Placer le dossier dans `C:\wamp64\www\` et démarrer WampServer.
2. Importer la base : `mysql -u root < database.sql` (ou via phpMyAdmin, onglet Importer). MySQL 8+ requis.
3. Ouvrir http://localhost/Projects/cite_les_tous/ (adapter le chemin).
