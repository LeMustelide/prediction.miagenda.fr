<form action="#" method="POST" class="form">
    <?php
    foreach ($data[$_GET['class']] as $k => $v) {
        echo "<div class='notes'>
                <label for='$k'>" . $v['nom'] . "</label>
                ";
        if(!isset($v['epreuve'])) {
            echo "
                <div class='noteInput'>
                    <div class='prev-btn' onclick='prevNum(this)'>
                        <span class='prev'></span>
                    </div>
                    <div class='next-btn' onclick='nextNum(this)'>
                        <span class='next'></span>
                    </div>
                    <div class='box' min='0' max='20'>".
                        (isset($_POST[$k]) && $_POST[$k] != "" ? $_POST[$k] : 10)
                    ."</div>
                    <input class='input' type='text' name='$k' value='".
                        (isset($_POST[$k]) && $_POST[$k] != "" ? $_POST[$k] : 10)
                    ."' hidden>
                </div>
            ";
        } else {
            foreach ($v['epreuve'] as $epreuve => $coef) {
                echo "
                    <div class='notes-body'>
                        <label for='$epreuve' hi>$epreuve</label>
                        <div class='noteInput'>
                            <div class='prev-btn' onclick='prevNum(this)'>
                                <span class='prev'></span>
                            </div>
                            <div class='next-btn' onclick='nextNum(this)'>
                                <span class='next'></span>
                            </div>
                            <div class='box' min='0' max='20'>".
                                (isset($_POST[$k."_".$epreuve]) && $_POST[$k."_".$epreuve] != "" ? $_POST[$k."_".$epreuve] : 10)
                            ."</div>
                            <input class='input' type='text' name='$k.$epreuve' value='".
                                (isset($_POST[$k."_".$epreuve]) && $_POST[$k."_".$epreuve] != "" ? $_POST[$k."_".$epreuve] : 10)
                            ."' hidden>
                        </div>
                        <span class='material-symbols-outlined' id='lock' onclick='lockNote(this)'>
                            lock_open
                        </span>
                    </div>
                ";
            }
        }
        echo "</div>";
    }
    ?>
    <div class="break"></div>
    <!-- <input class="predire" type="submit" name="submit" value="Prédire le résultat 🤞"> -->
    <div class="break"></div>
    <button type="button" class="predire" onclick="calculateMin()">combien pour avoir la moyenne</button>
    <div class="break"></div>
    <h2 class="resultat">
    </h2>
    <div class="break"></div>
    <h2 class="resultat2">
    </h2>
</form>
