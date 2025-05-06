<?php
$folders = [__DIR__ . '/snapshots']; // Use absolute path for reliability
$fileTypes = ['png', 'jpg', 'jpeg']; // Add your file types here (case-insensitive)
$files = [];

header('Content-Type: application/json'); // Set content type to JSON
header('Access-Control-Allow-Origin: *'); // Allow cross-origin requests

foreach ($folders as $folder) {
    if (!is_dir($folder)) {
        echo json_encode(['error' => "Folder '$folder' does not exist."]);
        exit;
    }

    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($folder));
    foreach ($iterator as $file) {
        if ($file->isFile()) {
            $extension = strtolower(pathinfo($file->getFilename(), PATHINFO_EXTENSION));
            if (in_array($extension, $fileTypes)) {
                // Convert to relative URL
                $files[] = str_replace($_SERVER['DOCUMENT_ROOT'], '', $file->getPathname());
            }
        }
    }
}

echo json_encode($files); // Return the file paths as a JSON array
?>