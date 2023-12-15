<form action="#" method="POST" style="display: flex; justify-content: center; flex-wrap: wrap;  align-items: center">
    <?php
    print_r($data);
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