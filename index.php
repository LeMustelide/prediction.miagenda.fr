<?php

include_once 'data.php';
include_once 'header.php';

if (!isset($_GET['class'])) {
    include 'class-list.php';
}

if (isset($_POST['submit'])) {
    // foreach ($key as $k) {
    //     if (!(isset($_POST[$k]) && $_POST[$k] != "")) {
    //         $erreur = "Vous devez remplir tout les champs";
    //     } else {
    //         if ($_POST[$k] < 0) {
    //             $erreur = "Tu dois mettre des nombres..";
    //         }
    //     }
    // }
    $formule = "";
    $communMean = 0;
    if (!isset($erreur)) {
        // on continue
        $miagesum = 0;
        $miagecount = 0;
        foreach ($data[$_GET['class']] as $k => $v) {
            if (isset($v['epreuve'])) {
                foreach ($v['epreuve'] as $epreuve => $coef) {
                    $miagesum += $coef * floatval(htmlspecialchars($_POST[$k . "_" . $epreuve]));
                    $miagecount += $coef;
                    if ($formule != "") {
                        $formule .= " + ";
                    }
                    $formule .= round($coef, 2) . " * " . floatval(htmlspecialchars($_POST[$k . "_" . $epreuve]));
                }
            } else {
                $miagesum += $v['coef'] * floatval(htmlspecialchars($_POST[$k]));
                $miagecount += $v['coef'];
                if ($formule != "") {
                    $formule .= " + ";
                }
                $formule .= $v['coef'] . " * " . floatval(htmlspecialchars($_POST[$k]));
            }
        }
        $miageMean = round($miagesum / $miagecount, 2);

        $moyenne = round(($miageMean + $communMean), 2);
    }

    $formule .= " = ($miagesum / $miagecount)";
    $formule .= " = $miageMean";
}

 

?>

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
    <?php }

    if (isset($_GET['class'])) {
        include 'form.php';
    }
    include 'footer.php';
