<?php

require_once("src/models/Quiz.php");

class QuizSSBController{

    private $quizModel;

    public function __construct(){
        $timing = 90;
        $nomJeux = "SSB";

        $this->quizModel = new Quiz($timing, $nomJeux);
    }

    public function index($nomJeux){
        $persos = $this->quizModel->getPerso($nomJeux);
        require_once("src/views/liste.php");
    }

    public function getTiming(){
        return $this->quizModel->getTimeLimit();
    }
}

?>