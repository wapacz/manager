<?php
    //error_log("callback php is started....");
    $file = './js/jquery.kanban-board.plugin.js';
    //$modified = filemtime($file);
    $modified = (int)$_GET['modified'];
    //error_log("modified: ".$modified);
    $n = 50; // 50 seconds
    while($n--)
    {
        clearstatcache();
        $modified_current = filemtime($file);
        //error_log("modified_current: ".$modified_current.", modified: ".$modified);
        if($modified < $modified_current)
        {
            header("Content-Type: application/json");
            echo json_encode(true);
            exit();
        }
        sleep(1);
    }
    header("Content-Type: application/json");
    echo json_encode(false);
    exit();
?>
