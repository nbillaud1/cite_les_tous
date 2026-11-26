#!/usr/bin/env bash
# Génère une copie statique du site dans un dossier (par défaut _site) pour GitHub Pages :
# le PHP tourne une seule fois ici, la grille du quiz est déjà dans le HTML, le JS fait le reste.
set -euo pipefail
OUT=${1:-_site}
PORT=8099

rm -rf "$OUT"
mkdir -p "$OUT/src/views"
php -S 127.0.0.1:$PORT >/dev/null 2>&1 &
PID=$!
trap 'kill $PID' EXIT

page() { curl -fsS --retry 10 --retry-connrefused --retry-delay 1 "http://127.0.0.1:$PORT/$1"; }
page 'index.php' > "$OUT/index.html"
page 'index.php?action=startSSB' > "$OUT/quiz.html"

cp -r ssbu-tips imgSSB "$OUT/"
cp -r src/css "$OUT/src/"
cp src/views/frontSSB.js "$OUT/src/views/"
touch "$OUT/.nojekyll"

# Les liens vers le routeur PHP deviennent des liens vers les pages générées
sed -i 's#href="?action=startSSB"#href="quiz.html"#g; s#href="?action=accueil"#href="index.html"#g; s#href="index.php"#href="index.html"#g' "$OUT/index.html" "$OUT/quiz.html"
sed -i 's#href="../index.php"#href="../index.html"#g' "$OUT"/ssbu-tips/*.html

# Garde-fous : base injoignable (die) ou lien PHP oublié = échec du build
grep -q 'data-id=' "$OUT/quiz.html" || { echo "Grille vide : la base est-elle importée ?" >&2; exit 1; }
! grep -rn 'index\.php\|?action=' "$OUT" --include='*.html' || { echo "Lien PHP restant" >&2; exit 1; }
echo "Site statique prêt dans $OUT ($(grep -c 'data-id=' "$OUT/quiz.html") combattants)"
