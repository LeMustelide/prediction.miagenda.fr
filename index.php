<?php

# structure de données
$data = [ 
    "M1 miage alt" => [
        "anad" => [
            "nom" => "Analyse des données",
            "coef" => 4,
        ],
        "bdsi" => [
            "nom" => "Base de données et systèmes d'information",
            "coef" => 4,
        ], 
        "crypto" => [
            "nom" => "Cryptographie",
            "coef" => 4,
        ],
        "mac" => [
            "nom" => "Méthodes avancées de conception",
            "coef" => 4,
        ],
        "lea" => [
            "nom" => "Langages et automates",
            "coef" => 4,
        ],
        "algo" => [
            "nom" => "Algorithmique",
            "coef" => 4,
        ],
        "anglais" => [
            "nom" => "Anglais",
            "coef" => 3,
        ],
        "proj" => [
            "nom" => "Projet informatique",
            "coef" => 3,
        ],
    ],
    "M1 miage fi" => [
        "anad" => [
            "nom" => "Analyse des données",
            "coef" => 3,
        ],
        "bdsi" => [
            "nom" => "Base de données et systèmes d'information",
            "coef" => 3,
        ],
        "crypto" => [
            "nom" => "Cryptographie",
            "coef" => 4,
        ],
        "mac" => [
            "nom" => "Méthodes avancées de conception",
            "coef" => 4,
        ],
        "lea" => [
            "nom" => "Langages et automates",
            "coef" => 3,
        ],
        "algo" => [
            "nom" => "Algorithmique",
            "coef" => 3,
        ],
        "anglais" => [
            "nom" => "Anglais",
            "coef" => 2,
        ],
        "proj" => [
            "nom" => "Projet informatique",
            "coef" => 3,
        ],
        "prod" => [
            "nom" => "Production",
            "coef" => 3,
        ],
        "ppp" => [
            "nom" => "PPP",
            "coef" => 2,
        ],
    ],
];


if (isset($_POST['submit'])) {
    foreach ($key as $k) {
        if (!(isset($_POST[$k]) && $_POST[$k] != "")) {
            $erreur = "Vous devez remplir tout les champs";
        } else {
            if (!($_POST[$k] >= 0)) {
                $erreur = "Tu dois mettre des nombres..";
            }
        }
    }

    if (!isset($erreur)) {
        // on continue
        $miagesum = 0;
        $miagecount = 0;
        foreach ($data[$_GET['class']] as $k => $v) {
            $miagesum += $v['coef'] * intval(htmlspecialchars($_POST[$k]));
            $miagecount += $v['coef'];
            if($formule != ""){
                $formule .= " + ";
            }
            $formule .= $v['coef'] . " * " . intval(htmlspecialchars($_POST[$k]));
        }
        $miageMean = round($miagesum / $miagecount, 2);

        $moyenne = round(($miageMean + $communMean), 2);
    }

    $formule .= " = ($miagesum / $miagecount)";
    $formule .= " = $miageMean";
    //echo $formule;
}


?>
<!doctype html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Master M1 MIAGE - Prédiction</title>
    <link rel="stylesheet" href="./global.css">
</head>

<body>
    <div class="navbar">
        <div class="title">M1 MIAGE</div>
    </div>

    <div class="container">
        <?php
        if (isset($erreur)) {
            echo "<span style='color:red; font-weight: bold'>$erreur</span>";
        }
        ?>

        <?php if (isset($moyenne) && $moyenne >= 10) { ?>
            <div class="moyenne">
                <div style="text-align: center;">
                    <h1>VAMOS 🙏</h1>
                    <div class="break"></div>
                    <h2>Tu devrais valider ton semestre avec <?= $moyenne; ?> de moyenne.</h2>
                    <h3>La formule de calcul est : <?= $formule; ?></h3>
                </div>
            </div>
        <?php } ?>
        <?php if (isset($moyenne) && $moyenne < 10) { ?>
            <div class="moyenne">
                <div style="text-align: center;">
                    <h1>Désolé.e 😖</h1>
                    <div class="break"></div>
                    <h2>Tu devrais terminer avec <?= $moyenne; ?> de moyenne, ça ne valide pas ton semestre...</h2>
                    <h3>La formule de calcul est : <?= $formule; ?></h3>
                </div>
            </div>
        <?php } ?>
        <form action="#" method="POST" style="display: flex; justify-content: center; flex-wrap: wrap;  align-items: center">
        <?php
                foreach ($data[$_GET['class']] as $k => $v) {
                    echo "<div class='notes'>";
                    echo "<label for='$k'>" . $v['nom'] . "</label>";
                    echo "<div class='noteInput'>";
                    echo "<div class='prev-btn' onclick='prevNum(this)'>";
                    echo "<span class='prev' ></span>";
                    echo "</div>";
                    echo "<div class='next-btn' onclick='nextNum(this)'>";
                    echo "<span class='next'></span>";
                    echo "</div>";
                    echo "<div class='box' min='0' max='20'>";
                    if (isset($_POST[$k]) && $_POST[$k] != "") {
                        echo $_POST[$k];
                    } else {
                        echo 10;
                    }
                    echo "</div>";
                    echo "<input class='input' type='text' name='$k' value='" . ((isset($_POST[$k]) && $_POST[$k] != "") ? $_POST[$k] : 10) . "' hidden>";
                    echo "</div>";
                    echo "</div>";
                }
            ?>
            <div class="break"></div>
            <input class="predire" type="submit" name="submit" value="Prédire le résultat 🤞">
        </form>
    </div>
    <script>
        function nextNum(object) {
            number = parseInt(object.parentElement.querySelector('.box').innerHTML);
            box = object.parentElement.querySelector('.box');
            max = parseInt(box.getAttribute('max'));
            min = parseInt(box.getAttribute('min'));
            if (number < max) {
                object.parentElement.querySelector('.box').innerHTML = number + 1;
                object.parentElement.querySelector('.input').value = number + 1;
                console.log(number + 1);
            }
        }

        function prevNum(object) {
            number = parseInt(object.parentElement.querySelector('.box').innerHTML);
            
            box = object.parentElement.querySelector('.box');
            max = parseInt(box.getAttribute('max'));
            min = parseInt(box.getAttribute('min'));
            if (number > min) {
                object.parentElement.querySelector('.box').innerHTML = number - 1;
                object.parentElement.querySelector('.input').value = number - 1;
                console.log(number - 1);
            }
        }
    </script>

</body>

</html>