<?php

include_once 'data.php';
include_once 'header.php';

if (!isset($_GET['class'])) {
    include 'class-list.php';
}

if (isset($_POST['submit'])) {
    $formule = "";
    if (!isset($erreur)) {
        // on continue
        $miagesum = 0;
        $miagecount = 0;
        foreach ($data[$_GET['class']] as $k => $v) {
            if (isset($v['epreuve'])) {
                $temp = 0;
                $tempCoef = 0;
                if ($formule != "") {
                    $formule .= " + ";
                }
                $formule .= "(";
                foreach ($v['epreuve'] as $epreuve => $coef) {
                    if($temp != 0) {
                        $formule .= " + ";
                    }
                    $temp += $coef * floatval(htmlspecialchars($_POST[$k . "_" . $epreuve]));
                    $tempCoef += $coef;
                    $formule .= round($coef, 2) . " * " . floatval(htmlspecialchars($_POST[$k . "_" . $epreuve]));
                }
                $formule .= ") * " . $v['coef'];
                $miagesum += $v['coef'] * ($temp / $tempCoef);
                $miagecount += $v['coef'];
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

        $moyenne = round($miageMean, 2);
    }

    $formule .= " = ($miagesum / $miagecount)";
    $formule .= " = $miageMean";
}

 

?>

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

    ?>
    <div class="moyenne">
        <div style="text-align: center;">
            <h1 class="title-resultat">VAMOS 🙏</h1>
            <div class="break"></div>
            <h2 class="resultat"></h2>
            <h3 class="formule">La formule de calcul est : <?= $formule; ?></h3>
        </div>
    </div>

    <?php

    include 'footer.php';
