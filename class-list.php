<div class="class-list">
    <?php
    foreach ($data as $key => $value) {
        echo "
            <div class='card'>
                <div class='card-header'>
                    <h2>" . $key . "</h2>
                </div>
                <div class='card-body'>
                    <button class='btn' onclick='window.location.href = \"?class=" . $key . "\"'>Prédire</button>
                </div>
            </div>
            ";
    }
    ?>
</div>
