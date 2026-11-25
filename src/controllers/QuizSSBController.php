<?php

require_once("src/models/Quiz.php");

class QuizSSBController{

    private $quizModel;

    public function __construct(){
        $this->quizModel = new Quiz();
    }

    public function index($nomJeux){
        $persos = $this->quizModel->getPerso($nomJeux);
        require_once("src/views/liste.php");
    }
}
