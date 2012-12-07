<?php
        $file = './js/jquery.kanban-board.plugin.js';
        header("Content-Type: application/json");
        echo json_encode(filemtime($file));
?>
