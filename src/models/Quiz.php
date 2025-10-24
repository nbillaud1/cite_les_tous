<?php

class Quiz {
    private $timeLimit;
    private $jeux;
    private PDO $pdo;

    public function __construct($timeLimit, $jeux) {
        $this->timeLimit = $timeLimit;
        $this->jeux = $jeux;

        try {
            $this->pdo = new PDO("mysql:host=localhost;dbname=cite_les_tous", 'root', '');
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Erreur de connexion : " . $exception->getMessage();
        }
    }

    public function getTimeLimit() {
        return $this->timeLimit;
    }

    public function getPerso($nomJeux) {
        $query = "SELECT persos.nom, persos.idPerso, persos.image FROM persos JOIN jeux ON persos.idJeux = jeux.idJeux WHERE jeux.nom = '$nomJeux'";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}