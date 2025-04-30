<?php
$folders = ['snapshots']; // Add your folders here
$fileTypes = ['png', 'PNG', 'jpg', 'jpeg', 'JPG']; // Add your file types here
$files = [];

header('Access-Control-Allow-Origin: *');

foreach ($folders as $folder) {
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($folder));
    foreach ($iterator as $file) {
        if ($file->isFile()) {
            $extension = strtolower(pathinfo($file->getFilename(), PATHINFO_EXTENSION));
            if (in_array($extension, $fileTypes)) {
                $files[] = $file->getPathname(); // Add the full path of the file
            }
        }
    }
}

echo json_encode($files); // Return the file paths as a JSON array
?>