<?php

class Quiz {
    private PDO $pdo;

    public function __construct() {
        try {
            // Identifiants surchargeables par variables d'environnement (hébergeur, CI) ; par défaut ceux de WAMP
            $hote = getenv('DB_HOST') ?: 'localhost';
            $this->pdo = new PDO("mysql:host=$hote;dbname=cite_les_tous;charset=utf8mb4", getenv('DB_USER') ?: 'root', getenv('DB_PASS') ?: '');
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            die("Erreur de connexion : " . $exception->getMessage());
        }
    }

    public function getPerso($nomJeux) {
        $query = "SELECT persos.nom, persos.alias, persos.idPerso, persos.image FROM persos JOIN jeux ON persos.idJeux = jeux.idJeux WHERE jeux.nom = ?";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute([$nomJeux]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
