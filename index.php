<?php 
require_once("src/views/header.php");
require_once("src/controllers/QuizSSBController.php");

$action = isset($_GET['action']) ? $_GET['action'] : 'accueil';


$quizSSBController = new QuizSSBController();
switch ($action) {
    case 'accueil':
        require_once('src/controllers/HomeController.php');
        break;
    case 'startSSB':
        $quizSSBController->index("SSB");
        $quizSSBController->getTiming();
        break;
}

require_once("src/views/footer.php");