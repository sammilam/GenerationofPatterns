<?php
$folders = ['img/*.png', 'motifs/*.png', 'sketch/*.png']; // Add your folders here
$files = ['png', 'jpg', 'jpeg', 'gif']; // Add your file types here
$files = [];
$files = array_merge($files, $folders);

foreach ($folders as $folder) {
    $files = array_merge($files, glob($folder));
}

echo json_encode($files);
?>