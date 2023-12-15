<?php
include 'data.php';
include 'header.php';


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
            if ($formule != "") {
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

    include 'form.php';
    include 'footer.php';
