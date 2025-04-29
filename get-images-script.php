<?php
$folders = ['img', 'motifs', 'sketch']; // Add your folders here
$fileTypes = ['png', 'jpg', 'jpeg', 'gif']; // Add your file types here
$files = [];

foreach ($folders as $folder) {
    foreach ($fileTypes as $type) {
        $files = array_merge($files, glob("$folder/*.$type")); // Search for each file type
    }
}

echo json_encode($files); // Return the file paths as a JSON array
?>