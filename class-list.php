<div class="class-list">
    <?php
    foreach ($data as $key => $value) {
        echo "
            <div class='card btn' onclick='window.location.href = \"?class=" . $key . "\"'>
                <div class='card-header'>
                    <h2>" . $key . "</h2>
                </div>
            </div>
            ";
    }
    ?>
</div>
